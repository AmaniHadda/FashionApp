const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);



describe(" -------------------- Retrieve   - Test Case -------------------- ", () => {
  it("Retrieve  function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .get("/favoris/retrieve/64876f897ad9621ef4b17f4f")
      // .set("Authorization", "Bearer" + authToken)
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
describe(" -------------------- Add   - Test Case -------------------- ", () => {
  it("Add  function ", function (done) {
    this.timeout(10000);
    chai
      .request("http://127.0.0.1:5002")
      .post("/save")
       .send({habillements : ["6487c525f562424640cb84a7","6487c7e2f562424640cb84a9"], idUser : ""})
      // .set("Authorization", "Bearer" + authToken)
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
