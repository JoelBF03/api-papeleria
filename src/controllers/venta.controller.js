const Venta = require("../models/Venta");
const DetalleVenta = require("../models/DetalleVenta");
const Cliente = require("../models/Client");
const Producto = require("../models/Article");

async function registrarVenta(req, res) {
  try {
    const data = req.body;

    const venta = new Venta();

    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    let detalles = data.detalles;
    let montoTotalVenta = 0;

    for (const element of detalles) {
      const detalleventa = new DetalleVenta();
      detalleventa.idproducto = element.idproducto;
      detalleventa.cantidad = element.cantidad;
      detalleventa.venta = venta._id;

      const detalle_save = await detalleventa.save();

      const producto_data = await Producto.findById(element.idproducto);

      if (producto_data) {
        await Producto.findByIdAndUpdate(
          producto_data._id,
          {
            stock: parseInt(producto_data.stock) - parseInt(element.cantidad),
          },
          { new: true }
        );

        montoTotalVenta += producto_data.price * element.cantidad; // Agregar el cálculo al monto total
        
      } else {
        res.send({ message: "No se encontró el producto" });
      }
    }

    venta.montoTotal = montoTotalVenta; // Asignar el monto total al objeto venta
    await venta.save(); // Guardar la venta con el monto total

    res.end();
  } catch (error) {
    console.error(error);
    res.send({ message: "No se pudo registrar la venta" });
  }
}

async function obtenerVenta(req, res) {
  try {
    const id = req.params["id"];

    const data_venta = await Venta.findById(id)
      .populate("idcliente")
      .populate("iduser")
      .exec();

    if (data_venta) {
      const data_detalle = await DetalleVenta.find({ venta: data_venta._id })
        .populate("idproducto")
        .exec();

      res.status(200).send({
        data: {
          venta: data_venta,
          detalles: data_detalle,
        },
      });
    } else {
      res.status(404).send({ message: "No se encontró la venta" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener la venta" });
  }
}

async function listadoVentaUser(req, res) {
  try {
    const id = req.params["id"];

    const data_venta = await Venta.find({ iduser: id })
      .populate("idcliente")
      .populate("iduser")
      .exec();

    if (data_venta) {
      res.status(200).send({ ventas: data_venta });
    } else {
      res.status(404).send({ message: "No se encontraron ventas" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener las ventas del usuario" });
  }
}

async function listadoVentaAdmin(req, res) {
  try {
    const data_venta = await Venta.find()
      .populate("idcliente")
      .populate("iduser")
      .exec();

    if (data_venta) {
      res.status(200).send({ ventas: data_venta });
    } else {
      res.status(404).send({ message: "No se encontraron ventas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener las ventas" });
  }
}

async function detalleVenta(req, res) {
  try {
    const id = req.params["id"];

    const data_detalles = await DetalleVenta.find({ venta: id })
      .populate("idproducto")
      .exec();

    if (data_detalles) {
      res.status(200).send({ detalles: data_detalles });
    } else {
      res
        .status(404)
        .send({ message: "No se encontraron detalles de la venta" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener los detalles de la venta" });
  }
}

module.exports = {
  registrarVenta,
  obtenerVenta,
  listadoVentaUser,
  listadoVentaAdmin,
  detalleVenta,
};
