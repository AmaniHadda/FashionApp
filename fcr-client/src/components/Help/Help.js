import React, { useEffect, useState } from "react";
import { CommentLouerService } from "../../services/CommentLouerService";

import { useTranslation } from 'react-i18next'

function Help() {
  const cls = new CommentLouerService();
  const [list, setList] = useState([]);

  const { t } = useTranslation()

  useEffect(() => {
    const fetch = async () => {
      await cls.fetch().then((res) => {
        setList(res.data);
      });
    };
    fetch();
  }, []);
  return (
    <div className="container">
      <div className="col-12  d-flex justify-content-center align-items-center">

        <h1>{t("help.Comment")}</h1>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        {list &&
          list.map((item, index) => (
            <div key={index} className="col-lg-4 col-sm-12" data-aos="fade-left">
                <div className="mt-4 d-flex justify-content-center align-items-center ">
                  <h1 className="">{item.title}</h1>
                </div>
               
              <div className="text-center col-11 pt-2">
                  <p className="">
                    {item.description}
                  </p>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Help;
