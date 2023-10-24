const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add new - Test Case -------------------- ", () => {
    it("Add new function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/contact/add")
      //  .set('Authorization','Bearer'+authToken)
        .send({name:"Name here", email:"aminlaribi18@gmail.com", phone : "58891853",objet:"test",message:"test"})
        .end(function (err, res) {
          if (err) {
            console.log("Error",err.text);
          } else {
            console.log("Res : "+res.text);
            done();
          }
        });
    });
  });

  describe(" -------------------- Find all   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/contact/allinfomrations")
      //  .set('Authorization','Bearer'+authToken)
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


  describe(" -------------------- Respond   - Test Case -------------------- ", () => {
    it("Respond  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/contact/respond/64b88b58ced7950b348daf74")
        .send({respond:"Respond here"})
      //  .set('Authorization','Bearer'+authToken)
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
  describe(" -------------------- Traiter   - Test Case -------------------- ", () => {
    it("Traiter  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/contact/traiter/64b88b58ced7950b348daf74")
      //  .set('Authorization','Bearer'+authToken)
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
  describe(" -------------------- Countbymonth   - Test Case -------------------- ", () => {
    it("Countbymonth  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/contact/countbymonth")
      //  .set('Authorization','Bearer'+authToken)
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


