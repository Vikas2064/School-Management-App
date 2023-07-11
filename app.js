const express = require("express")
const mongoose= require("mongoose")
const app = express()
const path = require("path")
const hbs = require("hbs");
const bodyParser = require('body-parser');

// manageing the database admin
require("./db/config");
const {admins, teachers, students,approveStudents,class1,class2,class3,class4,class5,class6,class7,class8}=require('./db/student.js');

app.use(express.json());

// teacher sign_page

const port = 3000;
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }));

// main page start here



app.get("/", (req, res) => {
  res.render("index")
})
app.get("/about", (req, res) => {
  res.render("about");
})
app.get("/course", (req, res) => {
  res.render("course");
})




// main page end here




// admin login and sign in page and the dashboard

app.get('/admin', (req, res) => {
  res.render("admin_main_page")
})
app.post('/admin', async (req, res) => {

  // res.send(`${req.body.email} and ${req.body.password}`)
  // let data= await managers.find({
  //     "$or":[
  //         {
  //             "name":{$regex:req..key}
  //         }
  //     ]
  // })
  // console.log(req.body);
  // res.send(req.body);
  try {
    if (req.query.Email && req.query.Password) {
      let singlePerson = await admins.find({
        Email: req.query.Email,
        Password: req.query.Password
      }).exec();
      res.render("admin_dashboard", {
        singlePerson: singlePerson
      })
      return res.json(singlePerson);
    } else {
      res.json({ error: "No name query found inside request" })
    }
  } catch (error) {
    throw error
  }
})

app.get('/admin_form', (req, res) => {
  res.render("admin_form");
})

app.post('/admin_form', async (req, res) => {
  // let data = new admins(req.body);
  // let result = await data.save();
  // console.log(result);
  // res.send(result);
  // res.send(`${req.body.firstname} and ${req.body.lastname}`);

  try {
    let  data = new admins(req.body);
    let result = await data.save();
    // console.log(result);
    res.status(200).send(data);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    else
      res.status(500).send("Something went wrong");

  }
})

app.get('/admin_second_page', (req, res) => {
  res.render("admin_second_page");
})

/////admin dashboard start here
app.get('/admin_dashboard', (req, res) => {
  res.render("admin_dashboard");
})

app.get('/add_teacher', (req, res) => {
  res.render("add_teacher_form");
})

app.post('/add_teacher', async (req, res) => {
  // let data = new teachers(req.body);
  // let result = await data.save();
  // console.log(result);
  // res.send("taecher add successfully");
  try {
    var data = new teachers(req.body);
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    else
      res.status(500).send("Something went wrong");

  }
})

app.get('/total_teacher', async (req, res) => {
  let data = await teachers.find();
  console.log(data)
  res.render("total_teacher", {
    data: data
  })
})

app.get('/add_student', (req, res) => {
  res.render("add_student_form");
})

app.post('/add_student', async (req, res) => {
  // console.log(req.body);
  let data,result;  
  if(req.body.Class==1)
  {
       data = new class1(req.body);
       result = await data.save(); 
      console.log(result);
      res.send("save successfully")
  }
  else if(req.body.Class==2)
  {
      data = new class2(req.body);
      result = await data.save();
  }
  else if(req.body.Class==3)
  {
      data = new class3(req.body);
      result = await data.save();
  }
  else if(req.body.Class==4)
  {
      data = new class4(req.body);
      result = await data.save();
  }
  else if(req.body.Class==5)
  {
      data = new class5(req.body);
      result = await data.save();
  }
  else if(req.body.Class==6)
  {
      data = new class6(req.body);
      result = await data.save();
  }
  else if(req.body.Class==7)
  {
      data = new class7(req.body);
      result = await data.save();
  }
  else if(req.body.Class==8)
  {
      data = new class8(req.body);
      result = await data.save();
  }
  console.log(result);
  res.send("student add successfully");
})
app.get('/total_student', async (req, res) => {
  res.render("total_student")
})



app.post('/total_student', async (req, res) => {
  let newclass= `class${req.body.but1}`;
  let data=await eval(newclass).find();
  res.render('show_student',{
        data:data,
        class:req.body.but1
      })
})
// admin attendance page 

app.get('/admin_attendance_page', (req, res) => {
  res.render("admin_attendance_page");
})

app.get('/show_attendance', (req, res) => {
  res.render("show_attendance");
})

// attendance page ends here 


/// admin_dashboard end here

app.get('/admin_teacher_page', (req, res) => {
  res.render("admin_teacher_page");
})

// admin students page start here 
app.get('/admin_student_page', (req, res) => {
  res.render("admin_student_page");
})

app.get('/approve_student', async (req, res) => {
  let data2 = req.body.add;
  let data = await approveStudents.find();
  res.render("approve_student", {
    data: data
  })
})

app.post('/approve_student', async (req, res) => {
  console.log(req.body);
  if(req.body.add)
  {
    let data=await approveStudents.findOne({
      _id:req.body.add
    })
    let newdata={
      FirstName:data.FirstName,
      LastName:data.LastName,
      DOB:data.DOB,
      Email:data.Email,
      PhoneNumber:data.PhoneNumber,
      Password:data.Password   
    }
    if(data.Class==1)
    {
        let data2 = new class1(newdata);
        let result = await data2.save();
        console.log(result)
    }
    else if(data.Class==2)
    {
        let data2 = new class2(newdata);
        let result = await data2.save();
        console.log(result)
    }
    else if(data.Class==3)
    {
        let data2 = new class3(newdata);
        let result = await data2.save();  
        console.log(result) 
    }
    else if(data.Class==4)
    {
        let data2 = new class4(newdata);
        let result = await data2.save();
        console.log(result)
    }
    else if(data.Class==5)
    {
        let data2 = new class5(newdata);
        let result = await data2.save();
        console.log(result)
    }
    else if(data.Class==6)
    {
        let data2 = new class6(newdata);
        let result = await data2.save();
        console.log(result)
    }
    else if(data.Class==7)
    {
        let data2 = new class7(newdata);
        let result = await data2.save();
        console.log(result)
    }
    else if(data.Class==8)
    {
        let data2 = new class8(newdata);
        let result = await data2.save();
        console.log(result)
    }
    await approveStudents.deleteOne({
      _id:req.body.add
     });
  }    
  else
  {
      await approveStudents.deleteOne({
      _id:req.body.delete
     });
  }
  res.send('done');
})

app.get("/student_approval_form", (req, res) => {
  res.render("student_approval_form")
})

app.post('/student_approval_form', async (req, res) => {
  // let data = new teachers(req.body);
  // let result = await data.save();
  // console.log(result);
  // res.send("taecher add successfully");
  try {
    var data = new approveStudents(req.body);
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    else
      res.status(500).send("Something went wrong");

  }
})

// admin students page end here
app.get('/admin_notice_page', (req, res) => {
  res.render("admin_notice_page");
})





////////////////// admin part ends here




//////////// teacher page start here 

app.get('/teacher', (req, res) => {
  res.render("teacher");
})

app.post('/teacher', (req, res) => {
  res.render("teacher");
})


app.get('/teacher_dashboard', (req, res) => {
  res.render("teacher_dashboard");
})

app.get('/teacher_form', (req, res) => {
  res.render("teacher_form");
})

app.post('/teacher_form', async (req, res) => {
  // let data = new teachers(req.body);
  // let result = await data.save();
  // console.log(result);
  // res.send(result);
  try {
    var data = new teachers(req.body);
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    else
      res.status(500).send("Something went wrong");
  }
})

//////teacher page ends here


////student page start here

app.get('/student', (req, res) => {
  res.render("student");
})

app.post('/student', (req, res) => {
  // res.render("teacher");
})


app.get('/student_dashboard', (req, res) => {
  res.render("student_dashboard");
})

app.get('/student_form', (req, res) => {
  res.render("student_form");
})

app.post('/student_form', async (req, res) => {
  // let data = new students(req.body);
  // let result = await data.save();
  // console.log(result);
  // res.send(result);
  try {
    var data = new students(req.body);
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    else
      res.status(500).send("Something went wrong");

  }
})

app.listen(port, () => {
  console.log("listening at the port 3000");
})
