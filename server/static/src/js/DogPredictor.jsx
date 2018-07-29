import React from 'react';
import { Upload, Button } from 'element-react';

class DogPredictor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: '',
			predictions: []
		};
	}

	render() {
		return (
            <div className="container">

				<Upload>
					<Button type="primary"> Upload </Button>
				</Upload>

			</div>
		);
	}
}

module.exports = DogPredictor;
