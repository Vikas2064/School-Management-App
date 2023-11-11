const mongoose=require("mongoose");
const bcrypt = require("bcryptjs")
const conn1 = mongoose.createConnection("mongodb://localhost:27017/Attendance");
const conn2 = mongoose.createConnection("mongodb://localhost:27017/Student");

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

adminsch.pre("save",async function(next){
    this.Password =await bcrypt.hash(this.Password,10);
    next();
})

// tacherschema
const teachersch= new mongoose.Schema({
    FirstName: String,
    LastName: String,
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

teachersch.pre("save",async function(next){
       this.Password = await bcrypt.hash(this.Password,10);
       next();
})

// studentshema 

const studentsch= new mongoose.Schema({ 
    FirstName: {String,},
    LastName: {String,},
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

studentsch.pre("save",async function(next){
    this.Password = await bcrypt.hash(this.Password,10);
    next();
})

// schema for the attendance
const attendanceSch= mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    Roll1:String,
    Roll2:String,
    Roll3:String,
    Roll4:String,
    5:String,
    6:String,   
    7:String,
    8:String,
    9:String,
    10:String,
    11:String,
    12:String,
})


const noticeSch= mongoose.Schema({
    student:String,
    teacher:String
})
 

const notice= conn2.model("notice",noticeSch);
const admins=conn2.model("admin",adminsch);
const teachers=conn2.model('teacher',teachersch)
const students=conn2.model('student',studentsch);
const approveStudent=conn2.model('approvestudent',studentsch);
const approveTeacher=conn2.model('approveteacher',teachersch);
const class1=conn2.model('class1',studentsch);
const class2=conn2.model('class2',studentsch);
const class3=conn2.model('class3',studentsch);
const class4=conn2.model('class4',studentsch);
const class5=conn2.model('class5',studentsch);
const class6=conn2.model('class6',studentsch);
const class7=conn2.model('class7',studentsch);
const class8=conn2.model('class8',studentsch);
const class1Att=conn1.model('class1Att',attendanceSch);
const class2Att=conn1.model('class2Att',attendanceSch);
const class3Att=conn1.model('class3Att',attendanceSch);
const class4Att=conn1.model('class4Att',attendanceSch);
const class5Att=conn1.model('class5Att',attendanceSch);
const class6Att=conn1.model('class6Att',attendanceSch);
const class7Att=conn1.model('class7Att',attendanceSch);
const class8Att=conn1.model('class8Att',attendanceSch);
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
    class8:class8,
    class1Att:class1Att,
    class2Att:class2Att,
    class3Att:class3Att,
    class4Att:class4Att,
    class5Att:class5Att,
    class6Att:class6Att,
    class7Att:class7Att,
    class8Att:class8Att,
    notice:notice
}




