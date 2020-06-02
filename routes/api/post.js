const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
// bringing the User Model from Mongoose
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route         POST api/Post
// @desc          Create a Post
// @access        Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      console.log("peticion a la ruta de post");
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      let exito = await newPost.save();

      if (exito) res.status(200).json(exito);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);
// @route         GET api/Post
// @desc          GET all posts
// @access        Private
router.get("/",async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
  }
});
// @route         GET api/Post/:id
// @desc          GET post by Id
// @access        Public
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id).sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ msg: "Post not found because ID get query is shitty" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// @route         DELETE api/Post/:id
// @desc          DELETE a post
// @access        Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    // Check User
    if (posts.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    if (!posts) {
      return res.status(401).json({ msg: "Post not Found" });
    }
    // remove Post by id
    await posts.remove();
    res.json(posts);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ msg: "Post not found because ID get query is shitty" });
    }
    console.error(error.message);
  }
});
// @route         PUT api/Post/like/:id
// @desc          Like a Post
// @access        Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post has already been liked
    // console.log(post.likes.map(a=>console.log(a.user)));

    // Find thew id
    let prueba = post.likes.filter(
      (post) => post.user.toString() === req.user.id
    );
    console.log("prueba es");
    // console.log(prueba[0]);
    // req.user
    console.log(req.user);

    console.log("Like a post route request sent");
    console.log("Post.likes");
    // console.log(post.likes);
    console.log("console.log(post.likes.map(a=>console.log(a.user)));");
    // console.log(post.likes.map(a=>console.log(a.user)));
    // res.json({finalResult: post.likes.filter(like => like.user.toString() === req.user.id).length > 0});
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post is  already liked by you " });
    }
    // el req.user id viene del auth middleware del token que viene por headers
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route         PUT api/Post/unlike/:id
// @desc          UNLike a Post
// @access        Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post has already been liked
    // req.user.id = token id from auth middleware
    // [{user: usuario, id: id}, {user: usuario, id: id}, {user: usuario, id: id},{user: usuario, id: id}].filter(like => like.user === req.user.id)
    // [{ user: usuarioIgualAlBuscado, id: idelObjeto }].length > 0 hay usuario
    // [].lenght > 0 no hay nada

    // hay un arreglo vacio
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked " });
    }
    // Remove Index
    // [{user: usuario, id: id}, {user: usuario, id: id}, {user: usuario, id: id},{user: usuario, id: id}].map(like => like.user.toString())
    // ["usuario1","usuario2","usuario3","usuario4","usuario5","usuario6"].indexOf("usuario2")
    // removeIndex = 1
    //primero el map hace un arreglo de ids luego a ese arreglo de ids busca el id de la peticion y guarda el indice de la posicion de ese objeto dentro del arreglo
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    //post.likes = [];
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("error de servidor PUT ID");
  }
});

// test

router.post("/commenta/:id", auth, async (req,res) =>{
  try {
    const [user,post] = await Promise.all([User.findById(req.user.id).select("-password"),Post.findById(req.params.id)]);
      const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);


  } catch (error) {
    //mierda fallo
    res.status(500).send("Server Error");
    
    
  }
} )

// @route                   POST api/posts/comment/:id
// @Desc                    Comment on a post
// @Access                  Private

router.post(
  "/comment/:id",
  [auth, [check("text", "texto es requerido").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // coje el usuario desde el token que viene desde el cliente y lo selecciona sin la contrasena
      //usa el middleware que se llama auth para de ahi extraer el token y el id del usuario
      // siempre y cuando el token sea valido
      const user = await User.findById(req.user.id).select("-password");
      // luego con req.params.id saca el id que vene desde la peticion por el cliente
      // comment/asdsadsajdi32232434
      // tiene todos los post de la base de datos que corresponden a ese id
      const post = await Post.findById(req.params.id);
      // solo crea un objeto con el cuerpo 
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      // a ese arreglo de post mete de primeras el nuevo objeto que se creo
      post.comments.unshift(newComment);
      // salva la operacion en la base de datos
      await post.save();
      // y devuelve todo el arreglo de posts actualizado
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route                   DELETE api/posts/delete/:id
// @Desc                    DELETE a post
// @Access                  Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => (comment.id = req.params.comment_id)
    );
    if (!comment)
      return res.status(404).json({ msg: "Comment does not exist" });
    //CHECK USER
    if (comment.user.toString() !== req.user.id) {
      if (!comment)
        return res
          .status(404)
          .json({ msg: "User does not exist or non authorized" });
    }
    // remove index
    const indexToNumber = post.comments
      .map((comments) => comments.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(indexToNumber, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
