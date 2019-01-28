import React, {Component} from "react";
import {Link} from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import auth from "../services/authService";

class MoviesTable extends Component {
    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) {
            this.columns.push(this.columnDelete);
        }
    }

    columnDelete = {
        key: "delete",
        content: movie => (
            <button
                onClick={() => this.props.onDelete(movie)}
                className="btn btn-danger btn-sm"
            >
                Delete
            </button>
        )
    };

    columns = [
        {
            path: "title",
            label: "Title",
            content: movie =>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        {path: "genre.name", label: "Genre"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {
            key: "like",
            content: movie => (
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>
            )
        }
    ];

    render() {
        const {movies, onSort, sortColumn, user} = this.props;

        return (
            <Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
                user={user}
            />
        );
    }
}

export default MoviesTable;
