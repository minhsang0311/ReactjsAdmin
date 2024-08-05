import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SanPhamThem() {
    const navigate = useNavigate();
    const [sp, setSp] = useState({});
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!sp.ten_sp || sp.ten_sp.trim() === "") {
            newErrors.ten_sp = "Tên sản phẩm không được để trống.";
        }
        if (!sp.gia || sp.gia <= 0) {
            newErrors.gia = "Giá sản phẩm phải lớn hơn 0.";
        }
        if (!sp.gia_km || sp.gia_km < 0) {
            newErrors.gia_km = "Giá khuyến mãi phải là số không âm.";
        }
        if (!sp.hinh || sp.hinh.trim() === "") {
            newErrors.hinh = "Hình sản phẩm không được để trống.";
        }
        if (!sp.ngay) {
            newErrors.ngay = "Ngày không được để trống.";
        }
        if (!sp.luot_xem || sp.luot_xem < 0) {
            newErrors.luot_xem = "Lượt xem phải là số không âm.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitDuLieu = () => {
        if (!validateForm()) return;

        let url = `http://localhost:3000/admin/sp`;
        let opt = {
            method: "post",
            body: JSON.stringify(sp),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                setSp({}); // Reset the form
                setErrors({}); // Optionally clear errors
                alert("Đã thêm sản phẩm", data.id);
                navigate("/admin/sp")
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi thêm sản phẩm.');
            });
    };

    return (
        <form id="frmaddsp">
            <h2>Thêm sản phẩm</h2>
            <div className="row mb-3">
                <div className='col'>
                    Tên sản phẩm
                    <input type="text" placeholder='Nhập tên sản phẩm' className="form-control" value={sp.ten_sp || ''} onChange={e => setSp({...sp, ten_sp: e.target.value})} />
                    {errors.ten_sp && <div className="text-danger">{errors.ten_sp}</div>}
                </div>
                <div className='col'>
                    Giá
                    <input type="number" placeholder='Nhập giá sản phẩm' className="form-control" value={sp.gia || ''} onChange={e => setSp({...sp, gia: e.target.value})} />
                    {errors.gia && <div className="text-danger">{errors.gia}</div>}
                </div>
                <div className='col'>
                    Giá KM
                    <input type="number" placeholder='Nhập giá khuyến mãi' className="form-control" value={sp.gia_km || ''} onChange={e => setSp({...sp, gia_km: e.target.value})} />
                    {errors.gia_km && <div className="text-danger">{errors.gia_km}</div>}
                </div>
            </div>
            <div className="row mb-3">
                <div className='col'>
                    Hình
                    <input type="text" placeholder='Nhập địa chỉ hình ảnh' className="form-control" value={sp.hinh || ''} onChange={e => setSp({...sp, hinh: e.target.value})} />
                    {errors.hinh && <div className="text-danger">{errors.hinh}</div>}
                </div>
                <div className='col'>
                    Ngày
                    <input type="date" placeholder='Chọn ngày' className="form-control" value={sp.ngay || ''} onChange={e => setSp({...sp, ngay: e.target.value})} />
                    {errors.ngay && <div className="text-danger">{errors.ngay}</div>}
                </div>
                <div className='col'>
                    Lượt xem
                    <input type="number" placeholder='Chọn số lượt xem' className="form-control" value={sp.luot_xem || ''} onChange={e => setSp({...sp, luot_xem: e.target.value})} />
                    {errors.luot_xem && <div className="text-danger">{errors.luot_xem}</div>}
                </div>
            </div>
            <div className='mb-3'>
                <button className="btn btn-warning" type="button" onClick={submitDuLieu}>Thêm sản phẩm</button> &nbsp;
                <a href="/admin/sp" className='btn btn-info'>Danh sách</a>
            </div>
        </form>
    );
}

export default SanPhamThem;
