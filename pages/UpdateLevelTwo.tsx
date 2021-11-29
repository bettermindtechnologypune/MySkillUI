import React, { useEffect, useState } from 'react'
const map1 = new Map();
export const UpdateLevelTwo = (props: { history: string[]; title: string; state: string; }) => {
    const [deliverable, setDeliverable] = useState<any>();
    const [deliverables, setDeliverableData] = useState<any>();
    useEffect(() => {
        (async () => {
            var Deliverables1 = await getDeliverables();
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
        fetch('https://localhost:44369/api/LevelTwo/' + buid, httpGetObject)
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
                    var sel = document.getElementById('searchDeliverables');
                    while (sel?.firstChild) {
                        sel?.removeChild(sel.firstChild);
                    }
                    var opt = null; let brek = null; var label1; let count = 0;
                    for (let i = 0; i < data.length; i++) {
                        brek = document.createElement("br");
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
        map1.set(e.target.id, e.target.value);
    }

    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
    }
    const submit = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        {

            for (const [key, value] of map1.entries()) {
                let levelId = key;
                var obj = {
                    buid: localStorage.getItem('buid'),
                    name: value,
                    isManagerRating: false
                }
                console.log(key, value);
                fetch('https://localhost:44369/api/LevelTwo/' + levelId, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
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
            }
            alert("deliverables Updated Successfully");
            props.history.push("./HrAdminHomePage");
        }
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
                                <div id="searchDeliverables" className="text-center col-6 mx-auto form-group">
                                    <br />
                                </div>
                            }
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" >Submit</button>&nbsp; &nbsp;
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


