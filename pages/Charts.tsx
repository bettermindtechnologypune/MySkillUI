import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart, StackedBarChart } from 'react-native-chart-kit';
import { StackedBarChartData } from 'react-native-chart-kit/dist/StackedBarChart';
import Header from './Header';
let li: []; const map1 = new Map();
export const Charts = (props: { history: string[]; title: string; state: string; }) => {
    const [products, setProductData] = useState<any>();
    const [product, setProduct] = useState<any>();
    const [charts, setChartData] = useState<any>();
    const [dataStru, setDataStructure] = useState<any>();
    var proName: any;
    useEffect(() => {
        (async () => {
            var product1 = await getProducts();
            if (product != undefined) {
				var chart = await getCharts();
            }
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
                    setProduct(data[0].id)
                    setProductData(data)
                    proName = data[0].id
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const getCharts = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');

        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/LeveTwo/skill-index/' + proName, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data != undefined) {
                    setChartData(data)
                    setDataStructure(null);
                    let arr = [];
                    for(let i = 0; i<data.length;i++){
                        arr = [data[i].skillLevelZeroCount, data[i].skillLevelOneCount, data[i].skillLevelTwoCount, data[i].skillLevelThreeCount, data[i].skillLevelFourCount, data[i].skillLevelFiveCount]
                        map1.set(data[i].levelTwoName, arr);
                    }
                    let labelsData = []; let entryData = []; let i = 0;
                    for (const [key, value] of map1.entries()) {
                        labelsData[i] = key;
                        entryData[i] = value;
                        i++
                    }
                    const dataStruct = {
                        labels: labelsData,
                        data: entryData,
                        barColors: ["#3399FF", "#F17A17", "#8D8C8B", "#F4BF0C", "#1837C6", "#27760B", ],
                        legend: ["Level 0", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
                    };
                    setDataStructure(dataStruct);
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
  
    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
    }
    const handleChange = (id: string) => {
		setProduct(id);
        proName = id;
        map1.clear();
        if(product != undefined){
            getCharts();
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
                
            <View>
                
                <div className="text-center col-6 mx-auto">
                <h2> Skill Base Chart View </h2>
                <br /><br />
                <form>
                <div className="col-sm-12">
                        <div className="row">
                    {products &&
                        <div className="text-center col-6 mx-auto form-group">
                            <label>Product Name <mark className="highlightedText">*</mark></label>
                            <select name="product" className="form-control" value={product.id} onChange={(event) => handleChange(event.target.value)}>
                                {products.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null; }, key: React.Key | null) => {
                                    return <option key={key} value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </div>
                    }
                </div>
            </div>
            </form>
            </div>
                <View style={styleSheet.MainContainer}>
                    {/* <BarChart
                        data={{
                            labels: ['R&D', 'Back Office', 'IT', 'Development', 'QA'],
                            datasets: [{ data: [10, 20, 50, 40, 20] }],
                        }}

                        width={Dimensions.get('window').width - 250}
                        height={230}
                        yAxisLabel={'SR - '}
                        chartConfig={{
                            backgroundColor: '#EB2828',
                            fillShadowGradient: '#FCBD00',
                            fillShadowGradientOpacity: 1,
                            backgroundGradientFrom: '#2F8079',
                            backgroundGradientTo: '#2F8079',
                            decimalPlaces: 0,
                            color: (opacity = 1) => '#DCE0E3',
                            style: {
                                borderRadius: 12, padding: 10
                            },
                        }}
                    /> */}
                    <br />
                    { dataStru &&
                        <StackedBarChart
                        data={dataStru}
                        width={Dimensions.get('window').width - 250}
                        height={230}
                        chartConfig={{
                            backgroundColor: '#EB2828',
                            fillShadowGradient: '#FCBD00',
                            fillShadowGradientOpacity: 1,
                            backgroundGradientFrom: '#F7FBFB',
                            backgroundGradientTo: '#F7FBFB',
                            decimalPlaces: 0,
                            color: (opacity = 1) => '#0C0C0D',
                            style: {
                                borderRadius: 12, padding: 10
                            },
                        }}
                    />
                    }
                    
                    <br />
                    <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>

                </View>
                </View>
            

        </div>
    )
}
const styleSheet = StyleSheet.create({

    MainContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
export default Charts;
Charts.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
