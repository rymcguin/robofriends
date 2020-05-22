import React, { Component } from 'react';

import './App.css'
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
//import { robots } from './robots';
import SearchBox from '../components/SearchBox.js';



class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: '',
		}
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(respons => respons.json())
			.then(users => { this.setState({ robots: users }) });
	}
	onSearch = (event) => {
		this.setState({ searchfield: event.target.value })

	}
	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		return (
			<div className='tc'>
				<h1 className='f1'> Robot Friends are my only friends</h1>
				<SearchBox search={this.onSearch} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>

			</div>
		);
	}

}

export default App;