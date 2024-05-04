import React from "react";

interface GenericTableComponentProps<M> {
    titles: string[];
    generateRow: (instance: M) => string[];
    instances: M[];
}

const GenericTableComponent: React.FC<GenericTableComponentProps<unknown>> = ({ titles, generateRow, instances }) => {
    return (
        <table className="w-full">
            <thead className="border-b py-10">
                <tr className="">
                    {
                        (["No"].concat(titles)).map(
                            (title) => (
                                <th className="font-bold w-1/5 text-left my-10 border-b py-5 border-dark" key={title}>
                                    {title}
                                </th>
                            )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    instances.map(
                        (instance, idx: number) => (
                            <tr key={generateRow(instance)[1]} className="">
                                {
                                    ([idx.toString()].concat(generateRow(instance))).map(
                                        (value) => <td className="w-1/5 py-5 border-b" key={value}>{value}</td>
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
