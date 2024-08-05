import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SanPhamSua() {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3000/admin/sp/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);
    const navigate = useNavigate();
    const submitDuLieu = (evt) => {
        evt.preventDefault();
        let opt = {
            method: "put", body: JSON.stringify(product),
            headers: { "Content-type": "application/json" }
        }
        fetch(`http://localhost:3000/admin/sp/${id}`, opt)
            .then(res => res.json()).then(data => {
                console.log("Kết quả =", data)
                navigate("/admin/sp");
            });
    }
    return (
        <form className="col-md-11 border border-danger border-2 m-auto mt-2">
            <div className="m-3 d-flex">
                <div className="col-6 p-1">Tên sản phẩm
                    <input type="text" defaultValue={product.ten_sp} onChange={e => product.ten_sp = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
                <div className="col-6 p-1"> Giá bán
                    <input type="number" defaultValue={product.gia} onChange={e => product.gia = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
            </div>

            <div className="m-3 d-flex">
                <button onClick={e => submitDuLieu(e)} type="button" className="btn btn-warning fw-bolder">Cập nhật sản phẩm </button>
            </div>
        </form>
    );
}

export default SanPhamSua;


