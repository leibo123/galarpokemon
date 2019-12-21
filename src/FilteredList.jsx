import React, { Component } from "react";
import { DropdownButton, Dropdown, Button} from "react-bootstrap";
import * as Constants from "./Constants.js";
import Pokemon from "./Pokemon";
// import RainbowHeader from "./RainbowHeader";
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart as faSolidHeart, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faSolidHeart, faRegularHeart, faAngleDown, faAngleUp)
const indices = [...Array(400).keys()];

class FilteredList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        search: "",
        type: "Any",
        highestStat: "Any",
        sortby: "Number",
        favorites: false,
        shinies: localStorage.getItem('shinylist') !== null && JSON.parse(localStorage.getItem('shinylist')).length === 400 ? true : false, 
        shinylist: localStorage.getItem('shinylist') !== null ? JSON.parse(localStorage.getItem('shinylist')) : [],
        favoritelist: localStorage.getItem('favoritelist') !== null ? JSON.parse(localStorage.getItem('favoritelist')) : [],
        ascending: true,
        colorIndex: 1,
        color: (localStorage.getItem('rainbowheader-color') !== null) ? localStorage.getItem('rainbowheader-color') : "orange",
        collapsed: true
      };
    }

    componentDidMount() {
      
      function stopWheel(e){
        if(!e){ /* IE7, IE8, Chrome, Safari */ 
            e = window.event; 
        }
        if(e.preventDefault) { /* Chrome, Safari, Firefox */ 
            e.preventDefault(); 
        } 
        e.returnValue = false; /* IE7, IE8 */
    }
    
      var elem = document.getElementById("pinned-content-id");
      if (elem.addEventListener) {    
          elem.addEventListener ("mousewheel", stopWheel, false);
          elem.addEventListener ("DOMMouseScroll", stopWheel, false);
      }
      else {
          if (elem.attachEvent) { 
              elem.attachEvent ("onmousewheel", stopWheel);
          }
      }
    }
  
    // sets the state whenever the user types on the search bar
    onSearch = event => {
      this.setState({ search: event.target.value.trim().toLowerCase() });
    };
  
    // sets the state whenever the filter type changes
    onSelectFilterType = event => {
      this.setState({ type: event })
    };

    onSelectFilterHighestStat = event => {
      this.setState({ highestStat: event})
    };

    // sets the state whenever the sort type changes
    onSelectSortType = event => {
      this.setState({sortby: event})
    };
  
    // determines whether an item's type matches the type we are filtering on
    matchesFilterType = item => {
      return (this.state.type === "Any") ? true : item.type1 === this.state.type || item.type2 === this.state.type;
    }

    matchesFilterHighestStat = item => {
      const highestStat = Math.max(item.HP, item.Att, item.Def, item.SAtt, item.SDef, item.Spd)
      return (this.state.highestStat === "Any") ? true : highestStat === item[this.state.highestStat];
    }

    matchesFavorite = item => {
      let index = parseInt(item.id.substring(1)) - 1;
      return (!this.state.favorites) ? true : this.state.favoritelist.indexOf(index) !== -1;
    }
  
    // to be used in the filter function
    filterAndSearch = item => {
      return item.name.toLowerCase().search(this.state.search) !== -1 && this.matchesFilterType(item) && this.matchesFilterHighestStat(item) && this.matchesFavorite(item);
    }

    sortBySelectedType = (item1, item2) => {
      let p1 = 0;
      let p2 = 0;
      if (this.state.sortby === "Number") {
        p1 = parseInt(item1.id.substring(1));
        p2 = parseInt(item2.id.substring(1));
      } else if (this.state.sortby === "totalStats") {
        p1 = item1.HP + item1.Att + item1.Def + item1.SAtt + item1.SDef + item1.Spd;
        p2 = item2.HP + item2.Att + item2.Def + item2.SAtt + item2.SDef + item2.Spd;
      } else if (this.state.sortby === "hpStat") {
        p1 = item1.HP;
        p2 = item2.HP;
      } else if (this.state.sortby === "attStat") {
        p1 = item1.Att;
        p2 = item2.Att;
      } else if (this.state.sortby === "defStat") {
        p1 = item1.Def;
        p2 = item2.Def;
      } else if (this.state.sortby === "sattStat") {
        p1 = item1.SAtt;
        p2 = item2.SAtt;
      } else if (this.state.sortby === "sdefStat") {
        p1 = item1.SDef;
        p2 = item2.SDef;
      } else if (this.state.sortby === "spdStat") {
        p1 = item1.Spd;
        p2 = item2.Spd;
      } else {
        console.log("This should not have happened.");
        return 0;
      }
      return (this.state.ascending) ? p1 - p2 : p2 - p1;
    }

    updateShinyList = (index) => {
      let newlist = this.state.shinylist;
      let i = this.state.shinylist.indexOf(index);
      if (i !== -1) {
        newlist.splice(i, 1);
      } else {
        newlist.push(index);
      }
      this.setState({shinylist: newlist});
      localStorage.setItem('shinylist', JSON.stringify(newlist));
    }

    addFavorite = (index) => {
      let newlist = this.state.favoritelist;
      let i = this.state.favoritelist.indexOf(index);
      if (i !== -1) {
        newlist.splice(i, 1);
        // var targetDiv = document.getElementById("heart" + index).getElementsByTagName("svg")[0];
        // // document.getElementById("heart" + index).replaceChild(targetDiv, <FontAwesomeIcon icon={faRegularHeart} />);
        // targetDiv.replaceWith(<FontAwesomeIcon icon={faRegularHeart} />);
      } else {
        newlist.push(index);
        // var targetDiv = document.getElementById("heart" + index).getElementsByTagName("svg")[0];
        // // document.getElementById("heart" + index).replaceChild(targetDiv, <FontAwesomeIcon icon={faSolidHeart} />);
        // targetDiv.replaceWith(<FontAwesomeIcon icon={faSolidHeart} />);
      }
      this.setState({favoritelist: newlist});
      localStorage.setItem('favoritelist', JSON.stringify(newlist));
      this.updateShinyList(index); // hack to prevent this event from also changing the shiny state TODO: fix
    }

    toggleFavorites = () => {
      this.setState({favorites: !this.state.favorites});
    }

    toggleAllShiny = () => {
      if (this.state.shinies) {
        this.setState({shinylist: []});
        localStorage.setItem('shinylist', JSON.stringify([]));
      } else {
        this.setState({shinylist: indices});
        localStorage.setItem('shinylist', JSON.stringify(indices));
      }
      this.setState({shinies: !this.state.shinies});
    }

    toggleAscending = () => {
      // document.getElementById("ascendingToggle").innerHTML = this.state.ascending ? "Descending": "Ascending";
      this.setState({ascending: !this.state.ascending});
    }

    clearAllFavorites = () => {
      this.setState({favoritelist: []});
      localStorage.setItem('favoritelist', JSON.stringify([]));
    }
    changeColor = () => {
      const colors = ["#ff4949", "orange", "yellow", "green", "#5677e6", "#b76eda"];
      this.setState({colorIndex: (this.state.colorIndex + 1) % 6})
      this.setState({color: colors[this.state.colorIndex]});
      localStorage.setItem('rainbowheader-color', colors[this.state.colorIndex]);
    }

    expandMenu = () => {
      if (this.state.collapsed) {
        document.getElementsByClassName("regular-size-filters")[0].style.display = "initial";
      } else {
        document.getElementsByClassName("regular-size-filters")[0].style.display = "none";
      }
      this.setState({collapsed: !this.state.collapsed});
    }
    renderPinnedContent = () => {
      const color = (localStorage.getItem('rainbowheader-color') === null) ? "orange" : localStorage.getItem('rainbowheader-color'); 
      return (
        <div>
          <div className="searchfiltersort-wrapper">
              <div id="dropdownbytype">
              <DropdownButton size="sm" title="Filter By Type" id="dropdown-basic-button-type">
                  <Dropdown.Item key="Any" eventKey="Any" onSelect={this.onSelectFilterType}>Any</Dropdown.Item>
                  {Constants.POKEMON_TYPES.map(type => {
                      return <Dropdown.Item key={type} eventKey={type} onSelect={this.onSelectFilterType}>{type}</Dropdown.Item>
                  })}
              </DropdownButton>
              </div>
              <DropdownButton size="sm" title="Filter By Highest Stat" id="dropdown-basic-button-highestStat">
                  <Dropdown.Item key="Any" eventKey="Any" onSelect={this.onSelectFilterHighestStat}>Any</Dropdown.Item>
                  {Constants.POKEMON_STATS_CONCISE.map(highestStat => {
                      return <Dropdown.Item key={highestStat} eventKey={highestStat} onSelect={this.onSelectFilterHighestStat}>{highestStat}</Dropdown.Item>
                  })}
              </DropdownButton>
              <span id="sortby-wrapper">
              <DropdownButton size="sm" title="Sort By" id="dropdown-basic-button-sortBy">
                  <Dropdown.Item key="Number" eventKey="Number" onSelect={this.onSelectSortType}>Number</Dropdown.Item>
                  <Dropdown.Item key="totalStats" eventKey="totalStats" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["totalStats"]}</Dropdown.Item>
                  <Dropdown.Item key="hpStat" eventKey="hpStat" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["hpStat"]}</Dropdown.Item>
                  <Dropdown.Item key="attStat" eventKey="attStat" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["attStat"]}</Dropdown.Item>
                  <Dropdown.Item key="defStat" eventKey="defStat" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["defStat"]}</Dropdown.Item>
                  <Dropdown.Item key="sattStat" eventKey="sattStat" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["sattStat"]}</Dropdown.Item>
                  <Dropdown.Item key="sdefStat" eventKey="sdefStat" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["sdefStat"]}</Dropdown.Item>
                  <Dropdown.Item key="spdStat" eventKey="spdStat" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["spdStat"]}</Dropdown.Item>
              </DropdownButton>
              <Button variant="secondary" id="ascendingToggle" size="sm" onClick={this.toggleAscending}>{this.state.ascending ? "Ascending": "Descending"}</Button>
              </span>
              <input type="text" placeholder="Search by Name" onChange={this.onSearch} />
            </div>
              <h5><span className="textbreak-wrapper">Showing <strong style={{color: color}}>{this.state.type}</strong> Type Pokemon with <strong style={{color: color}}>{Constants.POKEMON_STATS_FULL[this.state.highestStat]}</strong> as highest base stat,</span> <span className="textbreak-wrapper">sorted by <strong style={{color: color}}>{Constants.POKEMON_SORT_CRITERIA[this.state.sortby]} {this.state.ascending ? " (low -> high)" : " (high -> low)"}</strong>.</span></h5>
            <p>
              <strong>Tip: </strong> click on a Pokemon to toggle its shiny form or the heart to favorite it! &nbsp;&nbsp; 
              <span id="show-wrapper">
                <Button variant="secondary" size="sm" id="favoritestoggle" onClick={this.toggleFavorites}>{this.state.favorites ? "Show All" : "Show Favorites Only" }</Button>
                &nbsp; 
                <Button variant="secondary" size="sm" id="shinytoggle" onClick={this.toggleAllShiny}>{this.state.shinies ? "Show All Non-Shiny" : "Show All Shiny"}</Button>
              </span>
            </p>
          </div>)

    }

    render() {
      const filtered_result = this.props.items.filter(this.filterAndSearch);
      const filtered_sorted_result = filtered_result.sort(this.sortBySelectedType);
      const shinylist = this.state.shinylist;
      const favoritelist = this.state.favoritelist;
        return (
        <div className="filter-list">
          <div className="pinned-content" id="pinned-content-id">
          <Button id="clearCache" variant="outline-danger" size="sm" onClick={this.clearAllFavorites}>Clear All Favorites</Button>
            <div className="rainbowHeader" onClick={this.changeColor}>
                <h1 className="unselectable" style={{color: this.state.color}}>New Galar Region Pokemon</h1>
            </div>
            <div className="mobile-size-filters">
              <Collapsible trigger={<div id="collapse-wrapper" onClick={this.expandMenu}>{this.state.collapsed ? "Show Menu" : "Hide Menu"} {this.state.collapsed ? <FontAwesomeIcon icon={faAngleDown}/> : <FontAwesomeIcon icon={faAngleUp}/>}</div>}>
                {/* {this.renderPinnedContent()} */}
                <p></p>
              </Collapsible>
            </div>
            <div className="regular-size-filters">
              {this.renderPinnedContent()}
            </div>
          </div>
          <div className="pokemon-list">
            <ul>
                {filtered_sorted_result.map(pokemon => {
                    let index = parseInt(pokemon.id.substring(1)) - 1;
                    return <li onClick={this.updateShinyList.bind(this, index)} className="pokemon-li" key={index}>
                <button className="heart" id={"heart" + index} onClick={this.addFavorite.bind(this, index)}>{(favoritelist.indexOf(index) !== -1) ? <FontAwesomeIcon icon={faSolidHeart} /> : <FontAwesomeIcon icon={faRegularHeart}/>}</button>
                      <div className="pokemon-content">
                      <Pokemon pokemon={pokemon} image={this.props.images[index]} image_shiny={this.props.images_shiny[index]} shiny={shinylist.indexOf(index) !== -1}
                      image_type1={this.props.images_type[pokemon.type1]} 
                      image_type2={(pokemon.type2 === null) ? null : this.props.images_type[pokemon.type2]}/>
                      </div>
                    </li>
                })}
            </ul>
            {(filtered_result.length > 0) ? (<p></p>) : (<h4>No Pokemon Found</h4>)}
          </div>
        </div>
        );
    }
}

export default FilteredList;