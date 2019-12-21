import React, {Component} from 'react';

class Pokemon extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        shiny: this.props.shiny
      };
    }

    toggleImageShiny = () => {
      this.setState({shiny: !this.state.shiny});
    }

    renderStats = () => {
      return (
          <p>
            <span className="textbreak-wrapper">
              <strong>HP: </strong> {this.props.pokemon.HP}, 
              <strong> Att: </strong> {this.props.pokemon.Att},
              <strong> Def: </strong> {this.props.pokemon.Def},
            </span>
            <span className="textbreak-wrapper">
              <strong> SAtt: </strong> {this.props.pokemon.SAtt},
              <strong> SDef: </strong> {this.props.pokemon.SDef},
              <strong> Spd: </strong> {this.props.pokemon.Spd}
            </span><br/>
            <strong>Total: </strong> {this.props.pokemon.HP + this.props.pokemon.Att + this.props.pokemon.Def + this.props.pokemon.SAtt + this.props.pokemon.SDef + this.props.pokemon.Spd}
          </p>
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
      const image = (this.props.shiny) ? this.props.image_shiny : this.props.image;
      return (
      <div className="pokemon" onClick={this.toggleImageShiny}>
        <div className="inline-heading">
          <span>{this.props.pokemon.id.substring(1)}</span>
        </div> 
        <h3>{this.props.pokemon.name}</h3>
        <img key={image.id} src={image.src} alt={image.description} />
        {this.renderTypeImages()}
        {this.renderStats()}
      </div>
      )
    }
}

export default Pokemon;