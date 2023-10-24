const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Filterbyseason all   - Test Case -------------------- ", () => {
    it("Filterbyseason  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/filterHabillement/filterbyseason/64803b66b85acf0808329021")
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
describe(" -------------------- Filterbyseason all   - Test Case -------------------- ", () => {
    it("Filterbyseason  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/filterHabillement/filterbysubcategory/6487ce85f562424640cb8538")
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
describe(" -------------------- Filterbyseason all   - Test Case -------------------- ", () => {
    it("Filterbyseason  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/filterHabillement/filterbybrand/64803c54bf99874c3863733f")
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