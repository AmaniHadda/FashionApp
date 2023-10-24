const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add category - Test Case -------------------- ", () => {
    it("Add Category function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/admin/addCategory")
      //  .set('Authorization','Bearer'+authToken)
        .send({name:"Name here", description:"Description here"})
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

  describe(" -------------------- Find all categories  - Test Case -------------------- ", () => {
    it("Fetch categories  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/admin/fetchCategory")
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
  describe(" -------------------- Search categories  - Test Case -------------------- ", () => {
    it("Search categories  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/admin/search/test")
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

  describe(" -------------------- Update category - Test Case -------------------- ", () => {
    it("Update category function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/admin/updateCategory/64b6be646926c75d7c432821")
        .send({name:"Name updated" , description: "description updated" })
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
  describe(" -------------------- Archiver category - Test Case -------------------- ", () => {
    it("Archiver category function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/categories/64c6d285c805454a68c2e7f6/archive")
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