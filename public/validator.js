//Validation
const Joi = require('joi'); 
app.post('/books', async (req, res, next) => { 
  const { body } = req; const 
  blogSchema = Joi.object().keys({ 
    title: Joi.string().required(),
    author: Joi.string().required(), 
    year:Joi.integer().required()
  }); 
  const result = Joi.validate(body, blogSchema); 
  const { value, error } = result; 
  const valid = error == null; 
  if (!valid) { 
    res.status(422).json({ 
      message: 'Invalid request', 
      data: body 
    }) 
  } else { 
    const createdPost = await api.createPost(data); 
    res.json({ message: 'Resource created', data: createdPost }) 
  } 
});
