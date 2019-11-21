import React, { Component } from 'react';
import './Planets.css'
import axios from 'axios'


class Planets extends Component {
    state = {
        planetList: [],
        searchList: [],
        planetDetails: {},
        showPlanet: false
    }

    componentDidMount() {
        let apiPromises = [];
        let list = [];
        axios.get('https://swapi.co/api/planets/')
            .then(response => {

                let planetCount = response.data.count
                let length = Math.ceil(planetCount / 10);
                list = [...list, ...response.data.results];
                for (let i = 2; i <= length; i++) {
                    apiPromises.push(axios.get(`https://swapi.co/api/planets/?page=${i}`));
                }

                Promise.all(apiPromises).then((resolvedPromises) => {
                    resolvedPromises.forEach((promise) => {
                        list = [...list, ...promise.data.results];
                    });
                    this.setState({ planetList: list });
                });
            })


    }

    searchData = (e) => {
        var queryData = [];
        let actfontSize = 50;
        if (e.target.value !== '') {
            this.state.planetList.forEach((planet) => {
                if (planet.name.toLowerCase().includes((e.target.value.toLowerCase()))) {
                    queryData.push(planet);
                }
            });
            queryData = queryData.sort((a, b) => {
                if (a.population === "unknown" && b.population === "unknown") {
                    return false
                }
                else if (b.population === "unknown") {
                    return true
                } else if (a.population === "unknown") {
                    return true
                }
                else {
                    return b.population - a.population
                }

            });
            queryData = queryData.map((data) => {
                data.showInfo = false;
                data.fontSize = actfontSize;
                actfontSize = actfontSize - 1;
                return data;
            });

            this.setState({ searchList: queryData });
        };

    }

    handleClick = (planet) => {
        axios.get(planet.url)
            .then(response => {
                this.setState({ planetDetails: response.data });
                let { searchList } = this.state;
                let newSearchList = searchList.map((data) => {
                    data.showInfo = data.url === planet.url ? true : false;
                    return data;
                });
                this.setState({ searchList: newSearchList });
                this.setState({ showPlanet: false });
            })
        this.setState({ showPlanet: true });
    };

    handleLogout = (e) => {
        this.props.history.push('/');
    };

    render() {

        let displayLoading = this.state.showPlanet ? <p style={{ color: "blue" }}> Loading Planet Details </p> : ''


        let displayPlanets = this.state.searchList.map((planet) => {
            let planetSize = planet.fontSize + 'px'

            let displayPlanetInfo = planet.showInfo ? (
                <div >
                    <div>
                        Name : {this.state.planetDetails.name}
                    </div>
                    <div>
                        Rotation Period : {this.state.planetDetails.rotation_period}
                    </div>
                    <div>
                        Orbital Period : {this.state.planetDetails.orbital_period}
                    </div>
                    <div>
                        Diameter : {this.state.planetDetails.diameter}
                    </div>
                    <div>
                        Climate : {this.state.planetDetails.climate}
                    </div>
                    <div>
                        Gravity : {this.state.planetDetails.gravity}
                    </div>
                    <div>
                        Terrain: {this.state.planetDetails.terrain}
                    </div>
                    <div>
                        Population : {this.state.planetDetails.population}
                    </div>
                </div>) : ''


            return (
                <div className="planet-info">
                    <div onClick={() => this.handleClick(planet)}>
                        <p style={{ fontSize: planetSize }}>{planet.name}</p>
                        {displayPlanetInfo}

                    </div>
                </div>
            )
        })

        return (

            <div className='div'>
                <div >
                    <input className='input' onChange={this.searchData} placeholder="Search Planets" />
                </div>
                <div className='div'>
                    {displayLoading}
                    {displayPlanets}
                </div>

                <div >
                    <button className='btn' onClick={this.handleLogout}>Logout</button>
                </div>

            </div>
        )
    }
}

export default Planets

