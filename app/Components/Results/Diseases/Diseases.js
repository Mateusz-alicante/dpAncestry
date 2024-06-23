import { BarChart } from '@mantine/charts';
import styles from './Diseases.module.css'

import { useAtom } from 'jotai'
import { dataAtom } from '../../../utils/atoms';

import { Table } from '@mantine/core';


const generateDiseseData = (diseases) => {
    return diseases.map((disease) => {
        return {
            disease: disease[0],
            likelihood: disease[1]
        }
    }).sort((a, b) => b.likelihood - a.likelihood)
}

const ConditionTable = ({data}) => {
    if (!data || !Array.isArray(data.diseases) || data.diseases.length === 0)
        return
    console.log(typeof data)
    const rows = data.diseases.map((element) => (
        <Table.Tr key={element[0]}>
        <Table.Td>{element[0]}</Table.Td>
        <Table.Td>{element[1]}</Table.Td>
        </Table.Tr>
    ));
    return (
        <> 

            <Table>
            <Table.Thead>
                <Table.Tr>
                <Table.Th>Condition</Table.Th>
                <Table.Th>Likelihood</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            

        </>
    )
    }

export default () => {
    const [data, setData] = useAtom(dataAtom)
    console.log(data)
    data.diseases.map((disease) => {
        console.log(disease)
    })
    return (
      <div className={styles.container}>
        <h1>Most probable health conditions</h1>
         <BarChart
      h={300}
      data={generateDiseseData(data.diseases)}
      dataKey="disease"
      series={[{ name: 'likelihood', color: 'red' }]}
    />
        <ConditionTable data={data} />
      </div>
    );
  }
    