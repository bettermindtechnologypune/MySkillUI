import React, { useEffect, useState } from 'react'

export const UpdateLevelOne = (props: { history: string[]; title: string; state: string; }) => {
    const [product, setProduct] = useState<any>();
    const [products, setProductData] = useState<any>();
     let checkBool = true;    let arr: { Id: string | number | string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null; }[] = [];
    useEffect(() => {
        (async () => {
            var products1 = await getProducts();
        })()

    }, [])

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
                if (data != undefined) {
                    setProduct(data)
                    arr = data;
                    setProductData(data)
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function handleChange(e) {
    
        arr = products;
        // for (let userObject of arr) {
            // if (userObject.id ==  e.target.name) {
            //     let index = arr.indexOf(userObject);
            //     arr.splice(index, 1);
            //     userObject.name = e.target.value;
            //     arr.push(userObject);
            //     // products =  arr;
            //     // products.splice(0, 0, arr);
            //     setProductData(products, arr);
            //     // checkBool = false;
            // }
            var emails = products; // Make a copy of the emails first.
            // let index = arr.indexOf(userObject);
            emails[parseInt(e.target.name)].name = e.target.value; // Update it with the modified email.
            console.log("This is email",emails);
            arr = emails;
            setProductData(arr); // Update the state.
        // }     
    }
    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
    }
    const submit = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        let arra = []
        // arr.push(products)
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
                <h3>Edit Products !!</h3><br /><br />
                <form onSubmit={submit}>
                    <div className="col-sm-12">
                        <div className="row">
                            {products && 
                                <div className="form-group">
                                    <label>Product Name <mark className="highlightedText">*</mark></label>
                                    {products.map((e: { Id: string | number | string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null; }, key: React.Key | null) => {
                                        return <input type="text" key={key} value={e.name} name={key} onChange={handleChange.bind(this)} className="form-control" />
                                    })}

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
export default UpdateLevelOne;
UpdateLevelOne.defaultProps = {
    title: "Skill Base",
    searchBar: true
}


