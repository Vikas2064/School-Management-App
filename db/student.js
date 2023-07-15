const mongoose=require("mongoose");
  
///email validation
var validateEmail = function(email) {
    var re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email)
};

var validatePassword = function(Password) {
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(Password)
};

var validatePhoneNumber=function(PhoneNumber)
{
    var re=/^(\+\d{1,3}[- ]?)?\d{10}$/ ;
    return re.test(PhoneNumber);
}
var validateDOB=(DOB)=>{
    var re = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    return re.test(DOB);
}
// adminschema
const adminsch= new mongoose.Schema({
    FirstName:String,
    LastName:String,
    DOB:{
        type : String,
        validate: [validateDOB, 'Please fill a valid DOB']
    },
    Email: {
        type: String,
        trim: true,
        unique: true,
        required: [true,'Email address is required'],
        validate: [validateEmail, 'Please fill a valid email address']
    },
    PhoneNumber:{
        type:Number,
        validate: [validatePhoneNumber, 'Please fill a valid phone number']
    },
    MaxQualification:String,
    Experiance:Number,
    Password:{
        trim :true,
        type: String,
        unique: true,/////this is not a  validator
        required: [true,'password is required'],
        validate: [validatePassword, 'Please fill a valid Password']////// custom validator
    }
})

// tacherschema
const teachersch= new mongoose.Schema({
    FirstName:String,
    LastName:String,
    DOB:{
        type : String,
        validate: [validateDOB, 'Please fill a valid DOB']
    },
    Email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    PhoneNumber:{
        type:Number,
        validate: [validatePhoneNumber, 'Please fill a valid phone number']
    },
    MaxQualification:String,
    Experiance:Number,
    Password:{
        trim :true,
        type: String,
        unique: true,/////this is not a  validator
        required: [true,'password is required'],
        validate: [validatePassword, 'Please fill a valid Password']
    }
})

// studentshema 

const studentsch= new mongoose.Schema({ 
    FirstName:String,
    LastName:String,
    DOB:{
        type : String,
        validate: [validateDOB, 'Please fill a valid DOB'],
        },
    Email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
       },
    PhoneNumber:{
        type:Number,
        validate: [validatePhoneNumber, 'Please fill a valid phone number'],
      },
    Class:Number,
    Password:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validatePassword, 'Please fill a valid Password']
       }
})

////// students approval schema 

// schema for fees 

const admins=mongoose.model("admin",adminsch);
const teachers=mongoose.model('teacher',teachersch)
const students=mongoose.model('student',studentsch);
const approveStudent=mongoose.model('approvestudent',studentsch);
const approveTeacher=mongoose.model('approveteacher',teachersch);
const class1=mongoose.model('class1',studentsch);
const class2=mongoose.model('class2',studentsch);
const class3=mongoose.model('class3',studentsch);
const class4=mongoose.model('class4',studentsch);
const class5=mongoose.model('class5',studentsch);
const class6=mongoose.model('class6',studentsch);
const class7=mongoose.model('class7',studentsch);
const class8=mongoose.model('class8',studentsch);
module.exports={
    admins:admins,
    teachers:teachers,
    students:students,
    approveStudents:approveStudent,
    approveTeachers:approveTeacher,
    class1:class1,
    class2:class2,
    class3:class3,
    class4:class4,
    class5:class5,
    class6:class6,
    class7:class7,
    class8:class8
}

