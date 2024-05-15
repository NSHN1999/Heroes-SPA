import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";
import { getHeroByName } from "../helpers";
import { HeroeCard } from "../components";

export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);
    const heroes = getHeroByName(q);

    const showSearch = (q.length === 0);
    const showError = (heroes.length === 0) && q.length > 0;

    const { searchText, onInputChange } = useForm({
        searchText: q
    });

    const onSubmitSearch = (event) => {
        event.preventDefault();
        //if(searchText.trim().length <=1) return;
        navigate(`?q=${searchText}`);
    };

    return (
        <>
            <div className="row">
                <h1>Busqueda</h1>
                <hr/>
                <div className="col-5">
                    <h4>Busqueda</h4>
                    <hr/>
                    <form onSubmit={onSubmitSearch}>
                        <input
                            type="text"
                            placeholder="Buscar heroe..."
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button className="btn btn-outline-primary mt-1">
                            Buscar
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultado</h4>
                    <hr/>
                    {
                        //(q === '') ? <div className="alert alert-primary">Buscar un heroe</div>
                        //: (heroes.length === 0) && <div className="alert alert-danger">No se encontro <b>{q}</b></div>
                    }
                    <div className="alert alert-primary" style={{display: showSearch ? '' : 'none'}}>
                        Buscar un heroe
                    </div>
                    <div className="alert alert-danger" style={{display: showError ? '' : 'none'}}>
                        No se encontro <b>{q}</b>
                    </div>
                    {
                        heroes.map( heroe => (<HeroeCard key={heroe.id} {...heroe}/>))
                    }
                </div>
            </div>
        </>
    );
};
