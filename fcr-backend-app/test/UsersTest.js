const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

let authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWRhNzAxNGE0MjAzMjhjMGE2ZmYwZSIsImlhdCI6MTY4OTg0NDMxNH0.h8KK2x7feGh1GEcu13j23gGWzT8znZesgzvdCrHF63k";

describe(" -------------------- Test Sign up Function - Success Test -------------------- ", () => {
  it("Register function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .post("/user/register")
      .send({
        name: "Laribi Mohamed Amine",
        email: "aminlaribi18@gmail.com",
        phone: "12345678",
        address: "Tunis",
        birthday: "22-07-1996",
        gender: "homme",
        password: "AmineLaribi123@",
      })
      .end(function (err, res) {
        if (err) {
          console.log(err.text);
        } else {
          console.log(res.text);
          console.log("user logged");
          done();
        }
      });
  });
});

describe(" -------------------- Test Authentication Function - Success Test -------------------- ", () => {
  it("Login function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .post("/user/login")
      .send({ email: "wassym.jaffel@esprit.tn", password: "SUBzero@20" })
      .end(function (err, res) {
        if (err) {
          console.log(err.text);
        } else {
          console.log(res.text);
          console.log("user logged");
          done();
        }
      });
  });
});
describe(" -------------------- Enable Function - Success Test -------------------- ", () => {
  it("Enable function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .put("/user/enable/64b80c776926c75d7c43462d")
      .end(function (err, res) {
        if (err) {
          console.log(err.text);
        } else {
          console.log(res.text);
          done();
        }
      });
  });
});
describe(" -------------------- Search Function - Success Test -------------------- ", () => {
  it("Search function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .get("/user/search/test")
      .end(function (err, res) {
        if (err) {
          console.log(err.text);
        } else {
          console.log(res.text);
          done();
        }
      });
  });
});
describe(" -------------------- Update Function - Success Test -------------------- ", () => {
  it("Update function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .put("/user/update")
      .send({id:"64b80c776926c75d7c43462d",name:"aymen nejmaoui",email:"aymennejmaoui02@gmail.com",phone:"",birthday:"",address:""})
      .end(function (err, res) {
        if (err) {
          console.log(err.text);
        } else {
          console.log(res.text);
          done();
        }
      });
  });
});


