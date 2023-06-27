import './CardUser.scss';

function CardUser(props) {
    return (
        <section className="card_user ">
            <div className="card">
                <button className="btn_circle float-right" onClick={() => props.handleDelete(props.id)}>
                    x
                </button>

                <div className="card-details">
                    <p className="text-title">{props.name}</p>
                    <p className="text-body">
                        was born in
                        <span> {props.country}</span>
                    </p>
                    <p className="text-body font-bold">{props.year}</p>
                    <p className="text-body font-bold">{props.role}</p>
                </div>

                <button className="btn btn_edit" onClick={() => props.handleEdit(props.id)}>
                    Edit
                </button>
            </div>
        </section>
    );
}

export default CardUser;
