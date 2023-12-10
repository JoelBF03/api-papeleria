const Article = require("../models/Article");

async function registrar(req, res) {
  try {
    const data = req.body;
    const producto = new Article();
    producto.name = data.name;
    producto.descripcion = data.descripcion;
    producto.price = data.price;
    producto.stock = data.stock;

    const producto_save = await producto.save();

    if (producto_save) {
      res.status(200).send({
        producto: producto_save,
        message: "Producto registrado con éxito!",
      });
    } else {
      res.status(403).send({ message: "El producto no se registró" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

async function listarProducto(req, res) {
  try {
    const name = req.params["name"];
    const producto_listado = await Article.find({
      name: new RegExp(name, "i"),
    }).exec();

    if (producto_listado.length > 0) {
      res.status(200).send({ productos: producto_listado });
    } else {
      res.status(403).send({ message: "No existe un producto con ese título" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

async function editarProducto(req, res) {
  try {
    const id = req.params["id"];
    const data = req.body;

    const producto_edit = await Article.findByIdAndUpdate(
      id,
      { name: data.name, price: data.price },
      { new: true, runValidators: true }
    );

    if (producto_edit) {
      res.status(200).send({ producto: producto_edit });
    } else {
      res.status(500).send({ message: "Error al editar el producto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

async function obtenerProducto(req, res) {
  try {
    const id = req.params["id"];
    const producto_data = await Article.findOne({ _id: id });

    if (producto_data) {
      res.status(200).send({ producto: producto_data });
    } else {
      res.status(403).send({ message: "No existe el producto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

async function eliminarProducto(req, res) {
  try {
    const id = req.params["id"];
    const producto_eliminado = await Article.findByIdAndRemove({ _id: id });

    if (producto_eliminado) {
      res.status(200).send({ producto: producto_eliminado });
    } else {
      res.status(403).send({ message: "El producto no se pudo eliminar" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

async function act_stock(req, res) {
  try {
    const id = req.params["id"];
    const data = req.body;

    const producto_data = await Article.findById(id);

    if (producto_data) {
      const producto_edit = await Article.findByIdAndUpdate(
        id,
        { stock: parseInt(producto_data.stock) + parseInt(data.stock) },
        { new: true, runValidators: true }
      );

      if (producto_edit) {
        res.status(200).send({ producto: producto_edit });
      } else {
        res.status(500).send({ message: "Error al actualizar el stock" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

module.exports = {
  registrar,
  listarProducto,
  editarProducto,
  obtenerProducto,
  eliminarProducto,
  act_stock,
};