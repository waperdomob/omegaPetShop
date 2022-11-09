const path = require ("path");
const multer = require ("multer");
const { v4: uuidV4 } = require('uuid');



const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename:(reg, file, cb) =>{
      cb(null, uuidV4() + path.extname(file.originalname).toLowerCase())
  }
})

const upload = multer({
  storage : storage,
  dest: path.join(__dirname, '../public/uploads'),
  limits: {filesize:3000000},
  fileFilter:(req, file, cb) =>{
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if ( mimetype || extname ){
      return cb(null, true)
    }
    cb("error : tipo de archivo no valido")
  }
}).single('image')

module.exports = {upload}
