import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
let li: []; const map1 = new Map();
export const SkillIndexChart = (props: { history: string[]; title: string; state: string; }) => {
    const [charts, setChartData] = useState<any>();
    const [dataStru, setDataStructure] = useState<any>();
    var proName: any;
    useEffect(() => {
        (async () => {
            var chart = await getCharts();
        })()

    }, [])

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
        fetch('https://localhost:44369/api/Organization/skill-index/', httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data != undefined) {
                    setChartData(data)
                    setDataStructure(null);
                    let arr;
                    for (let i = 0; i < data.length; i++) {
                        arr = data[i].buSkillLevel
                        map1.set(data[i].businessUnitName, arr);
                    }
                    let labelsData = []; let entryData = []; let i = 0;
                    for (const [key, value] of map1.entries()) {
                        labelsData[i] = key;
                        entryData[i] = value;
                        i++
                    }
                    const dataStruct = {
                        labels: labelsData,
                        datasets: [
                          {
                            data: entryData
                          }
                        ]
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
        props.history.push("/OrganizationHomePage");
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
                    <h2> Skill Index Chart View </h2>
                    <br /><br />
                </div>
                <View style={styleSheet.MainContainer}>
                    <br />
                    {dataStru &&
                        <BarChart
                            data={dataStru}
                            width={Dimensions.get('window').width - 250}
                            height={350}
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
        alignItems: 'center',
        justifyContent: 'center',
    }

});
export default SkillIndexChart;
SkillIndexChart.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
