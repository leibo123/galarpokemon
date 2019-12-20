import React, { Component } from "react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import * as Constants from "./Constants.js";
import Pokemon from "./Pokemon";
import RainbowHeader from "./RainbowHeader";

const indices = [...Array(400).keys()];

class FilteredList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        search: "",
        type: "Any",
        highestStat: "Any",
        sortby: "Number",
        shinylist: [],
      };
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
  
    // to be used in the filter function
    filterAndSearch = item => {
      return item.name.toLowerCase().search(this.state.search) !== -1 && this.matchesFilterType(item) && this.matchesFilterHighestStat(item);
    }

    sortBySelectedType = (item1, item2) => {
      if (this.state.sortby === "Number") {
        return parseInt(item1.id.substring(1)) - parseInt(item2.id.substring(1));
      }
      const totalStat1 = item1.HP + item1.Att + item1.Def + item1.SAtt + item1.SDef + item1.Spd;
      const totalStat2 = item2.HP + item2.Att + item2.Def + item2.SAtt + item2.SDef + item2.Spd;
      return (this.state.sortby === "statDescending") ? totalStat2 - totalStat1 : totalStat1 - totalStat2;
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
    }

    toggleAllShiny = () => {
      const curState = document.getElementById("shinytoggle").innerHTML;
      if (curState === "Show All Shiny") {
        document.getElementById("shinytoggle").innerHTML = "Show All Non-Shiny";
        this.setState({shinylist: indices});
      } else {
        document.getElementById("shinytoggle").innerHTML = "Show All Shiny";
        this.setState({shinylist: []});
      }
    }

    render() {
      console.log("hi");
      const filtered_result = this.props.items.filter(this.filterAndSearch);
      const filtered_sorted_result = filtered_result.sort(this.sortBySelectedType);
      const shinylist = this.state.shinylist;
      console.log(shinylist);
        return (
        <div className="filter-list">
          <div className="pinned-content">
            <RainbowHeader text="New Galar Region Pokemon"/>
            <DropdownButton title="Filter By Type" id="dropdown-basic-button-type">
                <Dropdown.Item key="Any" eventKey="Any" onSelect={this.onSelectFilterType}>Any</Dropdown.Item>
                {Constants.POKEMON_TYPES.map(type => {
                    return <Dropdown.Item key={type} eventKey={type} onSelect={this.onSelectFilterType}>{type}</Dropdown.Item>
                })}
            </DropdownButton>
            <DropdownButton title="Filter By Highest Stat" id="dropdown-basic-button-highestStat">
                <Dropdown.Item key="Any" eventKey="Any" onSelect={this.onSelectFilterHighestStat}>Any</Dropdown.Item>
                {Constants.POKEMON_STATS_CONCISE.map(highestStat => {
                    return <Dropdown.Item key={highestStat} eventKey={highestStat} onSelect={this.onSelectFilterHighestStat}>{highestStat}</Dropdown.Item>
                })}
            </DropdownButton>
            <DropdownButton title="Sort By" id="dropdown-basic-button-sortBy">
                <Dropdown.Item key="Number" eventKey="Number" onSelect={this.onSelectSortType}>Number</Dropdown.Item>
                <Dropdown.Item key="statDescending" eventKey="statDescending" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["statDescending"]}</Dropdown.Item>
                <Dropdown.Item key="statAscending" eventKey="statAscending" onSelect={this.onSelectSortType}>{Constants.POKEMON_SORT_CRITERIA["statAscending"]}</Dropdown.Item>
            </DropdownButton>
            <input type="text" placeholder="Search by Name" onChange={this.onSearch} />
            <h5>Showing <strong>{this.state.type}</strong> Type Pokemon with <strong>{Constants.POKEMON_STATS_FULL[this.state.highestStat]}</strong> as highest base stat, sorted by <strong>{Constants.POKEMON_SORT_CRITERIA[this.state.sortby]}</strong>.</h5>
            <p>Tip: click on a Pokemon to toggle its shiny form! &nbsp; &nbsp; &nbsp; <Button variant="secondary" size="sm" id="shinytoggle" onClick={this.toggleAllShiny}>Show All Shiny</Button></p>
          </div>
          <div className="pokemon-list">
            <ul>
                {filtered_sorted_result.map(pokemon => {
                    let index = parseInt(pokemon.id.substring(1)) - 1;
                    return <li key={index} onClick={this.updateShinyList.bind(this, index)}><Pokemon pokemon={pokemon} image={this.props.images[index]} image_shiny={this.props.images_shiny[index]} shiny={shinylist.indexOf(index) !== -1}
                    image_type1={this.props.images_type[pokemon.type1]} 
                    image_type2={(pokemon.type2 === null) ? null : this.props.images_type[pokemon.type2]}/></li>
                })}
            </ul>
            {(filtered_result.length > 0) ? (<p></p>) : (<h4>No Pokemon Found</h4>)}
          </div>
        </div>
        );
    }
}

export default FilteredList;