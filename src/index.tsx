import { hydrate, prerender as ssr } from 'preact-iso';

import './style.css';
import Subject from "../compitence.json";
import { useCallback, useReducer, useState } from 'preact/hooks';

export function App() {
  const subject = {} as Record<string, Subject>;
  console.log(Subject)
  for (const comp of Subject) {
      subject[comp["id"]] = {
        compitences: comp["compitence"],
        classification: comp["classification"],
        credit: comp["credit"],
        id: comp["id"],
        title: comp["title"],
      };
  }
	return (
    <CompitenceContainer compitenceList={subject}/>
	);
}

type Subject = {
    compitences: number[]
    classification: string
    credit: number
    id: string
    title: string
}

function CompitenceContainer(props) {
    const reduce = (state: Record<string, Subject>, action: {type: string, subject: Subject}) => {
        switch (action.type) {
            case "rm":
                state[action.subject.id] = undefined;
                console.log("rm");
                console.log(state)
                return state;
            case "add":
                const mergedMap = {[action.subject.id]: action.subject, ...state}
                console.log("add");
                console.log(mergedMap)
                return mergedMap;
        }
    }
    const [selected, dispatch] = useReducer(reduce, {} as Record<string, Subject>);
    const createCompitence = () => {
        return [0,0,0,0,0,0,0,0,0,0];
    }
    const [compitencePoint, setCompitencePoint] = useState(createCompitence());

    const calculate = useCallback(() => {
        const tmp = createCompitence();
        for (let i = 0; i < tmp.length; i++) {
            tmp[i] = compitencePoint[i];
        }
        for (const k in selected) {
            for (let i = 0; i < tmp.length; i++) {
                tmp[i] += props.compitenceList[k]!.compitences[i]
            }
        }
        console.log(tmp);
        setCompitencePoint(tmp);
    }, [selected])

    return (
        <div>
            <div>
                {Object.values(props.compitenceList).map((subject: Subject) => (
                    <div key={subject.id}>
                        <label for={subject.id}>{subject.title}（{subject.id}）</label>
                        <a href={`https://kdb.tsukuba.ac.jp/syllabi/2024/${subject.id}/jpn/0`}>KdB</a>
                        <input type="checkbox" id={subject.id} onChange={() => dispatch({type: (typeof subject.id === "undefined" ? "rm" : "add"), subject})}/>
                    </div>
                ))}
            </div>
            <button onClick={calculate}>start</button>
            <div>
                {compitencePoint.map(c => (
                    <div>{c}</div>
                ))}
            </div>
        </div>
    )
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
