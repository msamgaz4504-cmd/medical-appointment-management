import "./ServicesCard.css"
const ServicesCard = (props) => {
    const itemsList = props.items
    const cards = itemsList.map(item => <div className="services-card" key={item.id}>
                                             <img src={item.image}></img>
                                             <h3>{item.title}</h3>
                                             <p>{item.description}</p>
                                             </div>)
  return (
    <div className="cards-container">{cards}</div>
  )
};export default ServicesCard