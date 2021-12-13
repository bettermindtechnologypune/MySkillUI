import React, { useEffect, useState } from 'react'
let li: [];  var array: string | any[] = [];  let cout = 0; let takName = null; let tak: null = null; let tak1: null = null;
export const UpdateLevelTwo = (props: { history: string[]; title: string; state: string; }) => {
    const [deliverable, setDeliverable] = useState<any>();
    const [deliverables, setDeliverableData] = useState<any>();
    const [productNames, setProductNames] = useState<any>();
    const [productN, setProductN] = useState<any>();
    const [cou, setCount] = useState<any>(0);
    useEffect(() => {
        (async () => {
            var Deliverables1 = await getDeliverables();
            var prodcuct = await getProducts();
        })()

    }, [])

    const getDeliverables = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');
        let buid = localStorage.getItem('buid');
        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/LeveTwo/get-list-by-buid/' + buid, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data.status == 404) {
                    console.log("Data Not Found");
                    var olddata = document.getElementById("searchDeliverables");
                    while (olddata?.firstChild) {
                        olddata?.removeChild(olddata.firstChild);
                    }
                } else if (data.status == 400) {
                    console.log("No data Found")
                }
                else if (data != undefined) {
                    setDeliverableData(data)
                    li = data;
                    var sel = document.getElementById('searchDeliverables');
                    var sel1 = document.getElementById('searchProduct');

                    while (sel?.firstChild && sel1?.firstChild) {
                        sel?.removeChild(sel.firstChild);
                        sel1?.removeChild(sel1.firstChild);
                    }
                    var opt = null; let brek = null; var label1; let count = 0; var lineB;
                    for (let i = 0; i < data.length; i++) {
                        brek = document.createElement("br");
                        lineB = document.createElement("br");
                        label1 = document.createElement("LABEL");
                        label1.innerHTML = "Deliverable Name :  ";
                        opt = document.createElement('input');
                        opt.className = "form-control";
                        opt.id = data[i].id;
                        opt.value = data[i].name;
                        opt.innerHTML = data[i].name;
                        count == 0 ? (sel == null ? document.getElementById('searchDeliverables') : sel.appendChild(label1)) : count++;
                        sel == null ? document.getElementById('searchDeliverables') : sel.appendChild(opt);
                        sel == null ? document.getElementById('searchDeliverables') : sel.addEventListener("change", updateValue);
                        sel == null ? document.getElementById('searchDeliverables') : sel.appendChild(brek);

                        count++;
                    }
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function updateValue(e: { target: { value: any; id: any }; }) {
        var arrray1 = li; let checkBol = true;  tak = e.target.id;
        for (let userObject of arrray1) {
            console.log(userObject);
            if (userObject.id == e.target.id) {
                let index = arrray1.indexOf(userObject);
                li?.splice(index, 1);
                userObject.name =e.target.value;
                li?.push(userObject);
                checkBol = false;
            }
        }
        if (checkBol) {
            let obj = {
                id: e.target.id != "" ? e.target.id : undefined,
                name: e.target.value,
                levelOneId: tak1,
                isLastLevel: false
            }
            li.push(obj);
        }
    }
    function handleChange(e: { target: { value: any; id: any }; }) {
        setProductN(e.target.value);
        takName = e.target.value;
        for (let userObject of e.target) {
            console.log(userObject);
            if(userObject.value == e.target.value){
                tak1 = userObject.id;
            }
        }
       
    }
    const submitBack = (e: { preventDefault: () => void; }) => {
        cout = 0;
        props.history.push("/HrAdminHomePage");
    }
    const submit = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        {
            const arr = [];
            if (li != undefined) {
                for (let i = 0; i < li.length; i++) {
                    var obj = {
                        id: li[i].id,
                        levelOneId: li[i].levelOneId,
                        name: li[i].name,
                        isLastLevel: li[i].isLastLevel
                    }
                    arr.push(obj)
                }
            }
            fetch('https://localhost:44369/api/LeveTwo/Update', {
                method: 'PATCH',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arr),
            })
                .then(response => {
                    if (response.status == 200)
                        return response.json()
                    else {
                        console.log(response)
                        throw new Error("Unauthorized")
                    }
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            alert("Deliverables Updated Successfully");
            props.history.push("./HrAdminHomePage");
        }
    }
    const addFields = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var sel1 = document.getElementById('searchProducts');
        var sel = document.getElementById('searchDel');
        var opt = null; var opt1 = null; var lineB = null; let brek = null; var label1; var lineB2; var lineB1; var label2;
        label2 = document.createElement("LABEL");
        label2.innerHTML = "Deliverable Name :  ";
        label1 = document.createElement("LABEL");
        label1.innerHTML = "Product Name :  ";
        lineB1 = document.createElement("br");
        var selectList = document.createElement("select");
        selectList.className = "form-control";
        sel1 == null ? document.getElementById('searchProducts') : sel1.appendChild(selectList);   
       
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            option.value = array[i].name;
            option.text = array[i].name;
            option.id = array[i].id;
            selectList.appendChild(option);
        }
        lineB = document.createElement("br");
        opt = document.createElement('input');
        opt.className = "form-control";
        lineB1 = document.createElement("br");
        lineB2 = document.createElement("br");
        cout == 0 ? (sel1 == null ? document.getElementById('searchProducts') : sel1.appendChild(label1)) : setCount(cout+1);
        sel1 == null ? document.getElementById('searchProducts') : sel1.appendChild(selectList);
        sel1 == null ? document.getElementById('searchProducts') : sel1.appendChild(lineB1);
        sel1 == null ? document.getElementById('searchProducts') : sel1.addEventListener("change", handleChange);
        cout == 0 ? (sel == null ? document.getElementById('searchDel') : sel.appendChild(label2)) : setCount(cout+1);
        sel == null ? document.getElementById('searchDel') : sel.appendChild(opt);
        sel == null ? document.getElementById('searchDel') : sel.appendChild(lineB);
        sel == null ? document.getElementById('searchDel') : sel.addEventListener("change", updateValue);
        cout++;
        setCount(cou+1);
    }
    const clearFields = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var sel = document.getElementById('searchDel');
        var sel1 = document.getElementById('searchProducts');
        if (cou > 0) {
            for (let i = 0; i < 2; i++) {
                sel?.removeChild(sel.lastElementChild);
                sel1?.removeChild(sel1.lastElementChild);
                if(cou == 1 && sel.lastElementChild && sel1.lastElementChild){
                    sel?.removeChild(sel.lastElementChild);
                    sel1?.removeChild(sel1.lastElementChild);
                }
                setCount(cou - 1);
                cout = 0;
            }
        }
    }
    const getProducts = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');
        let buid = localStorage.getItem('buid');
        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/LevelOne/' + buid, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data.status == 404) {
                    console.log("Data Not Found");
                    var olddata = document.getElementById("searchProducts");
                    while (olddata?.firstChild) {
                        olddata?.removeChild(olddata.firstChild);
                    }
                } else if (data.status == 400) {
                    console.log("No data Found")
                }
                else if (data != undefined) {
                    setProductNames(data)
                    setProductN(data[0]);
                    tak1 = data[0].id;
                    array = data;
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{props.title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="./">Logout</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">{props.state}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="text-center col-6 mx-auto">
                <h3>Edit deliverables !!</h3><br /><br />
                <form onSubmit={submit}>
                    <div className="col-sm-12">
                        <div className="row">
                            {deliverables &&
                                <div id="searchDeliverables" className="col-6 form-group">
                                    <br />
                                </div>
                            }
                            <div className="row">
                             <div id="searchProducts" className="col-6 form-group">
                                </div>
                                <div id="searchDel" className="col-6 form-group">
                                </div>
                                </div>
                            {/* {productNames &&
                                <div className="text-center col-6 mx-auto form-group">
                                    <label>Product Name:</label>
                                    <select name="productName" className="form-control text-center col-6 mx-auto " value={productN} onChange={(event) => handleChange(event.target.value)}>
                                        {productNames.map((e: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => {
                                            return <option key={key} value={e.id}>{e.name}</option>;
                                        })}
                                    </select>
                                </div>
                            } */}
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" onClick={addFields} >Add</button>&nbsp; &nbsp; &nbsp; &nbsp;
                        <button type="submit" className="btn btn-primary" onClick={clearFields}>Clear</button>&nbsp; &nbsp; &nbsp; &nbsp;
                        <button type="submit" className="btn btn-primary" >Submit</button>&nbsp; &nbsp; &nbsp; &nbsp;
                        <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default UpdateLevelTwo;
UpdateLevelTwo.defaultProps = {
    title: "Skill Base",
    searchBar: true
}


