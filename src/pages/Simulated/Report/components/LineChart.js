import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart(props) {
  const [report, setReport] = useState(props.report)
  const [simulateds, setSimulateds] = useState(props.report.simulateds)
  const [simulatedsNames, setSimulatedsNames] = useState([])
  const [downloaded, setDownloaded] = useState(false)
  let arrayData = []
  let arraySimulatedsNames = []
  const [series, setSeries] = useState([{
    name: 'Series 1',
    data: [],
  }])
  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false
      },
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },

    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    yaxis: {
      title: {
        text: '(acertos)'
      },
      min: 0,
      max: 100,
    },
    xaxis: {
      categories: [
        "penal",
        "civil",
        "administrativo",
        "processualcivil",
        "constitucional",
        "empresarial",
        "processualpenal",
        "trabalhista",
        "processualdotrabalho",
        "tributario",
        "humanos",
        "códigodedefesadoconsumidor",
        "estatutodacriancaeadolescente",
        "ambiental",
        "internacional",
        "filosofiadodireito",
        "estatutodaadvocacia",
        "regulamentogeral",
        "códigodeetica",
        "disciplinadaoab"],
    }
  })

  const init = async () => {
    setReport(props.report)

    simulateds.map(async (simulated) => {
      arraySimulatedsNames.push(simulated._id)
      let result = await simulated.simulated.pointsTotal / simulated.simulated.questions.length
      console.log("array of Data: " + Math.round(result * 100))

      arrayData.push(Math.round(result * 100))


      setSeries([{ name: 'Simulados', data: arrayData }])
      setOptions({
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
          },

        },

        markers: {
          size: 1
        },

        fill: {
          opacity: 0.1
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
          categories: arraySimulatedsNames,
        },
      })

    })
  }

  useEffect(() => {
    init().then(async () => {
      setDownloaded(true)
    })

  }, [])


  return (
    <div id="chart" style={{ width: "100%", paddingLeft: '10%', paddingRight: '10%', }}>
      {downloaded ? <ReactApexChart options={options} series={series} type="line" /> : <></>}
    </div>
  )
}

export default ApexChart
