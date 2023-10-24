const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);



  describe(" -------------------- Find all   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/abonnements/retrieve")
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


  describe(" -------------------- Find all restored   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/abonnements/retrieve/enable")
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

  describe(" -------------------- Find all archived   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/abonnements/retrieve/disable")
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

  describe(" -------------------- Find by id   - Test Case -------------------- ", () => {
    it("Fetch by id  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/abonnements/retrieve/648645416de12757d8ed265f")
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
  // describe(" -------------------- Delete by id   - Test Case -------------------- ", () => {
  //   it("delete by id  function ", function (done) {
  //     this.timeout(10000);
  //     chai
  //       .request("http://127.0.0.1:5002")
  //       .delete("/abonnements/delete/64c667d47a985d10e4c8c8e0")
  //     //  .set('Authorization','Bearer'+authToken)
  //       .end(function (err, res) {
  //         if (err) {
  //           console.log(err.text);
  //         } else {
  //           console.log(res.text);
  //           done();
  //         }
  //       });
  //   });
  // });
  describe(" -------------------- Search   - Test Case -------------------- ", () => {
    it("Search   function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/abonnements/search/ab")
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

