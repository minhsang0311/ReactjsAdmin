import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from './Search';

function SanPhamList() {
    const [listSP, setListSP] = useState([]);
    const [filteredSP, setFilteredSP] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/admin/sp`)
            .then(res => res.json())
            .then(data => {
                setListSP(data);
                setFilteredSP(data);
            });
    }, []);

    const xoaSP = (id) => {
        if (window.confirm('Bạn có muốn xóa sản phẩm không?') === false) return;
        fetch(`http://localhost:3000/admin/sp/${id}`, { method: "delete" })
            .then(res => res.json())
            .then(() => navigate(0));
    };

    const sortByName = () => {
        const sortedList = [...filteredSP].sort((a, b) => {
            if (a.ten_sp.toLowerCase() < b.ten_sp.toLowerCase()) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a.ten_sp.toLowerCase() > b.ten_sp.toLowerCase()) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredSP(sortedList);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        const handle = setTimeout(() => {
            handleSearch(searchQuery);
        }, 300);

        return () => {
            clearTimeout(handle);
        };
    }, [searchQuery]);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filteredList = listSP.filter(sp =>
            sp.ten_sp.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredSP(filteredList);
    };

    const onSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <div id="adminspList">
            <Search onSearch={onSearchChange} />
            <div>
                <button onClick={sortByName} className="btn btn-secondary">
                    Sắp xếp theo tên ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tên SP</th>
                        <th>Hình</th>
                        <th>Ngày</th>
                        <th>Giá</th>
                        <th><a href="/admin/spthem">Thêm</a></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSP.map((sp, i) => (
                        <tr key={i}>
                            <td>{sp.ten_sp}</td>
                            <td><img src={sp.hinh} alt={sp.ten_sp}/></td>
                            <td>{new Date(sp.ngay).toDateString("vi")}</td>
                            <td>{Number(sp.gia).toLocaleString("vi")} VNĐ</td>
                            <td>
                                <a href="#/" className="btn btn-danger" onClick={() => xoaSP(sp.id)}>Xóa</a> &nbsp;
                                <Link to={`/admin/spsua/${sp.id}`} className="btn btn-primary">Sửa</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SanPhamList;


