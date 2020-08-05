const Blog=require('../../model/blog');
const mongoose=require('mongoose');
const { interopDefault } = require('next/dist/next-server/server/load-components');
const testDB='mongodb://localhost:27017/TestingDB'
beforeAll(async()=>{
    await mongoose.connect(testDB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
})

// afterAll(async()=>{
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
// })

describe('Blog Schema Test',()=>{
    it('Should add a new blog',async()=>{
        let newBlog=await Blog.create({
            'title':'Test',
            'blog':'This is test'
        })
        expect(newBlog.title).toMatch('Test');
    })
    it('Should remove the blog',async()=>{
        deletedBlog=await Blog.findOneAndRemove({'title':'Test'});
        expect(deletedBlog.title).toMatch('Test');
    })
})