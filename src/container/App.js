import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox.js';
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField, requestRobots} from '../actions.js';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots()
	}
	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return (
				<div className='tc'>
					<h1 className='f1'> Robot Friends are my only friends</h1>
					<SearchBox search={onSearchChange} />
					<Scroll>
					{isPending ?<h1>Loading</h1> 
					:
					<ErrorBoundry>
						<CardList robots={filteredRobots} />
					</ErrorBoundry>
						
					}
					</Scroll>

				</div>
			);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);