import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
//import { robots } from './robots';
import SearchBox from '../components/SearchBox.js';

import { setSearchField, requestRobots} from '../actions.js';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onSearch: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => requestRobots(dispatch)
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots()
	}
	render() {
		const { searchField, onSearch, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ?
			<div>Loading</div> :
			(
				<div className='tc'>
					<h1 className='f1'> Robot Friends are my only friends</h1>
					<SearchBox search={onSearch} />
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>

				</div>
			);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);