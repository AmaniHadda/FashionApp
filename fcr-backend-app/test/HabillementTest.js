const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add new - Test Case -------------------- ", () => {
    it("Add new function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/habillements/create")
      //  .set('Authorization','Bearer'+authToken)
        .send({name:"Name here",description:"value",price : 100, subcategoryFK:"64b886a05b406b108025a4eb", seasonFK:"64803b60b85acf080832901e", brandFK:"64803c4fbf99874c3863733c", isNew_ : true, sizes : ["S","M","L"], shoesizes : ["32"]})
        .end(function (err, res) {
          if (err) {
            console.log("Error",err.text);
          } else {
            console.log("Res : "+res.ok);
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
        .get("/habillements/retrieve")
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

  describe(" -------------------- Find by sub category archived   - Test Case -------------------- ", () => {
    it("Fetch by  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/habillements/retrieve/subcategory/64b86d7ebc517874ac024d73")
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
        .get("/habillements/retrieve/enable")
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
        .get("/habillements/retrieve/disable")
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
  describe(" -------------------- Search   - Test Case -------------------- ", () => {
    it("Search  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/searchHabillement/test")
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
  describe(" -------------------- Search   - Test Case -------------------- ", () => {
    it("Search  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/recentlySeen/64b86d7ebc517874ac024d73")
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

