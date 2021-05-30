import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart(props) {
  const [report, setReport] = useState({})
  const [downloaded, setDownloaded] = useState(false)
  const [series, setSeries] = useState([{
    name: 'Series 1',
    data: [],
  }])
  const [options, setOptions] = useState(
    {
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },

      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 0
      },
      yaxis: {
        title: {
          text: '(acertos)'
        },
        tickAmount: 5,
        min: 0,
        max: 100,

      },
      xaxis: {
        categories: [],
      },
    },
  )

  const init = async () => {
    setReport(props.report)
    let disciplines = [{ name: "penal" },
    { name: "civil" },
    { name: "administrativo" },
    { name: "processualcivil" },
    { name: "constitucional" },
    { name: "empresarial" },
    { name: "processualpenal" },
    { name: "trabalhista" },
    { name: "processualdotrabalho" },
    { name: "tributario" },
    { name: "humanos" },
    { name: "codigodedefesadoconsumidor" },
    { name: "estatutodacriancaeadolescente" },
    { name: "ambiental" },
    { name: "internacional" },
    { name: "filosofiadodireito" },
    { name: "estatutodaadvocacia" },
    { name: "regulamentogeral" },
    { name: "codigodeetica" },
    { name: "disciplinadaoab" }]
    let arrayDiscipline = []
    let arrayData = []
    disciplines.map(async (discipline) => {
      let result = await props.report.totalByDiscipline.[discipline.name].hits / props.report.totalByDiscipline.[discipline.name].total
      if (props.report.totalByDiscipline.[discipline.name].total > 0) {
        arrayDiscipline.push(discipline.name)
        arrayData.push(result * 100)
        setSeries([{ name: 'Series 1', data: arrayData }])
        setOptions({
          chart: {
            toolbar: {
              show: false
            },
            height: 500,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1
            }
          },


          fill: {
            opacity: 0.1
          },
          markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#FF4560',
            strokeWidth: 2,
          },

          yaxis: {
            title: {
              text: '(acertos)'
            },
            tickAmount: 5,
            min: 0,
            max: 100,

          },
          xaxis: {
            categories: arrayDiscipline,
          },
        })
      }
    })
  }

  useEffect(() => {
    init().then(async () => {
      setDownloaded(true)
    })

  }, [])


  return (
    <div id="chart" style={{ width: "100%", paddingLeft: '10%', paddingRight: '10%' }}>
      {downloaded ? <ReactApexChart options={options} series={series} type="radar" /> : <></>}
    </div>
  )
}


export default ApexChart
