import React,{Component} from 'react';
import {SpeciesInfo} from './ui_components/info';
import Preloader from './ui_components/preloader';
import RelatedElement from './ui_components/relatedElement';
import {fetchData} from '../actions/fetchData';
import {getFilmName,getVehicleName,getPlanetName,getSpecieName,getStarshipName,getPeopleName} from '../actions/getName';

import {connect} from 'react-redux';
import axios from 'axios';

let  imgPath='';

 class SpecieDetail extends Component{
      componentDidMount(){  
       let url =`https://swapi.co/api${this.props.match.url}`;
       imgPath=`/images/species/${this.props.match.params.id}.jpg`;
        this.props.fetchData(url);
    
        axios.get(url).then((res)=>res.data).then((res)=>{   
      
       
        res.films.map((film)=>this.props.getFilmName(film));
        this.props.getPlanetName(res.homeworld);
        res.people.map((people)=>this.props.getPeopleName(people));
        
       }
       )
     }
    
    render(){
        let detail=this.props.detail.data;
        //console.log(this.props.match.params.id);
        if(Object.keys(detail).length===0 ){return <div className='detail-page'><Preloader/></div>}
        let films=this.props.detail.films;
        let planet=this.props.detail.planets;
        let people=this.props.detail.people;
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
             <SpeciesInfo info={detail} homeworld={planet}/> 
            </div>
            </div>
            <div className='related'>
            <RelatedElement elements={films} name='films'/>
            <RelatedElement elements={people} name='people'/>
            <RelatedElement elements={[]} name='starships'/>
            </div>
             </div>
        )
    }
} 

const mapStatetoProps=state=>({
    detail:state.sw_data.detail
})

export default connect(mapStatetoProps,{fetchData,getFilmName,getVehicleName,getPlanetName,getSpecieName,getStarshipName,getPeopleName})(SpecieDetail);