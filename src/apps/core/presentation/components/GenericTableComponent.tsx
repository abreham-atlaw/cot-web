import React from "react";

interface GenericTableComponentProps<M> {
    titles: string[];
    generateRow: (instance: M) => string[];
    instances: M[];
    addNo?: boolean;
}

const GenericTableComponent: React.FC<GenericTableComponentProps<unknown>> = ({ titles, generateRow, instances, addNo }) => {

    addNo = addNo ?? true;
    if(addNo){
        titles = ["No"].concat(titles);
    }
    const rows = instances.map((instance, idx) => {
        let row = generateRow(instance);
        if(addNo){
            row = [(idx + 1).toString()].concat(row);
        }
        return row;
    });
    const columnsCount = titles.length;
    return (
        <table className="w-full block">
            <thead className="border-b py-10 block w-full">
                <tr className="flex w-full">
                    {
                        titles.map(
                            (title) => (
                                <th className={`block font-bold w-[${100/columnsCount}%] text-left my-10 border-b py-5 border-dark`} key={title}>
                                    {title}
                                </th>
                            )
                        )
                    }
                </tr>
            </thead>
            <tbody className="block">
                {
                    rows.map(
                        (row) => (
                            <tr key={row[1]} className="flex">
                                {
                                    (row).map(
                                        (value) => <td className={`w-[${100/columnsCount}%] py-5 border-b overflow-clip text-ellipsis pr-5`} key={value}>{value}</td>
                                    )
                                }
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
}

export default GenericTableComponent;
