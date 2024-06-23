import Map from "./Map/Map";
import { Table } from '@mantine/core';

import { useAtom } from 'jotai'
import { dataAtom } from '../../../utils/atoms';

export default () => {
    const [data, setData] = useAtom(dataAtom)

    const rows = data.countries.map((element) => (
        <Table.Tr key={element[0]}>
        <Table.Td>{element[0]}</Table.Td>
        <Table.Td>{element[1]}</Table.Td>
        </Table.Tr>
    ));
    return (
        <> 
            <h2>Heritage information:</h2>
            <Map />

            <Table>
            <Table.Thead>
                <Table.Tr>
                <Table.Th>Country</Table.Th>
                <Table.Th>Proportion</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            

        </>
    )
    }