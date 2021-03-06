import React,{Component} from 'react';
import {PeopleInfo} from './ui_components/info';
import Preloader from './ui_components/preloader';
import RelatedElement from './ui_components/relatedElement';
import {fetchData} from '../actions/fetchData';
import {getFilmName,getVehicleName,getPlanetName,getSpecieName,getStarshipName} from '../actions/getName';

import {connect} from 'react-redux';
import axios from 'axios';

let  imgPath='';

 class PeopleDetail extends Component{
      componentDidMount(){  
       let url =`https://swapi.co/api${this.props.match.url}`;
       imgPath=`/images/people/${this.props.match.params.id}.jpg`;
        this.props.fetchData(url);
    
        axios.get(url).then((res)=>res.data).then((res)=>{   
      
        res.vehicles.map((vehicle)=>this.props.getVehicleName(vehicle));
        res.films.map((film)=>this.props.getFilmName(film));
        res.starships.map((starship)=>this.props.getStarshipName(starship));
        this.props.getPlanetName(res.homeworld);
        res.species.map((specie)=>this.props.getSpecieName(specie));

        
       }
       )
     }
    
    render(){
        let detail=this.props.detail.data;
        //console.log(this.props.match.params.id);
        if(Object.keys(detail).length===0 ){return <div className='detail-page'><Preloader/></div>}
        let films=this.props.detail.films;
        let vehicles=this.props.detail.vehicles;
        let starships=this.props.detail.starships;
        let specie=this.props.detail.species;
        let planet=this.props.detail.planets;
        //this.getName('https://swapi.co/api/films/2/');
        //console.log(filmsUrl); 
        //console.log(this.props.detail);
        
       
        return(
            <div className='detail-page'>
            <div className='info'>
            <figure>
                <img src={imgPath} alt={imgPath}/>
            </figure>
            <div className='detail'>
             <PeopleInfo info={detail} specie={specie} homeworld={planet}/> 
            </div>
            </div>
            <div className='related'>
            <RelatedElement elements={films} name='films'/>
            <RelatedElement elements={vehicles} name='vehicles'/>
            <RelatedElement elements={starships} name='starships'/>
            </div>
             </div>
        )
    }
} 

const mapStatetoProps=state=>({
    detail:state.sw_data.detail
})

export default connect(mapStatetoProps,{fetchData,getFilmName,getVehicleName,getPlanetName,getSpecieName,getStarshipName})(PeopleDetail);