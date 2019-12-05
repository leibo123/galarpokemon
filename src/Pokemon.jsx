import React, {Component} from 'react';

class Pokemon extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        shiny: false
      };
    }

    toggleImageShiny = () => {
      this.setState({shiny: !this.state.shiny});
    }

    renderStats = () => {
      return (
          <p>{this.props.pokemon.id}<br/>
          <strong>HP: </strong> {this.props.pokemon.HP}, 
          <strong> Att: </strong> {this.props.pokemon.Att},
          <strong> Def: </strong> {this.props.pokemon.Def},
          <strong> SAtt: </strong> {this.props.pokemon.SAtt},
          <strong> SDef: </strong> {this.props.pokemon.SDef},
          <strong> Spd: </strong> {this.props.pokemon.Spd}</p>
      )
    }

    renderTypeImages() {
      return (
        (this.props.pokemon.type2 === null) ?         
        <div>
          <img className="type" key={this.props.image_type1.id} src={this.props.image_type1.src} alt={this.props.image_type1.description}/>
        </div> :
        <div>
          <img className="type" key={this.props.image_type1.id} src={this.props.image_type1.src} alt={this.props.image_type1.description}/>
          <img className="type" key={this.props.image_type2.id} src={this.props.image_type2.src} alt={this.props.image_type2.description}/>
        </div>
      )
    }

    render() {
      const image = (this.state.shiny) ? this.props.image_shiny : this.props.image;
      return (
      <div className="pokemon" onClick={this.toggleImageShiny}>
          <h3>{this.props.pokemon.name}</h3>
          <img key={image.id} src={image.src} alt={image.description} />
          {this.renderTypeImages()}
          {this.renderStats()}
      </div>
      )
    }
}

export default Pokemon;