/**
 * Ugly way to store the questions, for each attribute.
 * @type {Array}
 */

var q_attr = null;//current attribute of the visible question

/** Choose a random attribute and question */
function showQuestion()
{
    var field = questions[_.random(0, _.size(questions) - 1)];
    q_attr = field['a'];

    dom_q.html(field['q'][_.random(0, field['q'].length - 1)]);
}


var questions = [
    {
        a : 'power',
        q : [
            "Set your thermostat a few degrees lower in the winter and a few degrees higher in the summer to save on heating and cooling costs.",
            "Unplug appliances when you're not using them (not sleep mode).",
            "Wash clothes in cold water whenever possible. As much as 85 percent of the energy used to machine-wash clothes goes to heating the water.",
            "Use a drying rack or clothesline to save the energy otherwise used during machine drying.",
        ]
    },
    {
        a : 'transport',
        q : [
            "Walk or bike to work. This saves on gas and parking costs while improving your cardiovascular health and reducing your risk of obesity.",
            "Telecommute : Don't drive to the office, or fly to that conference, if you can arrange to complete your work/presentation electronically, or via video conferencing. Video conferencing can reduce 99 percent of the energy used for a trans-continental flight.",
            "While renting, I consider moving closer to work.Even if this means paying more rent, it could save you money in the long term.",
            "Lobby your local government to increase spending on sidewalks and bike lanes. With little cost, these improvements can pay huge dividends in bettering your health and reducing traffic.",
            "Catch a taxi.Really these are a form of public transport because you don't own them, and when you don't need the service they are made available for others to use. Look out for hybrid or pedi-cab taxis for an even greener option."
        ]
    },
    {
        a : 'food',
        q : [
            "If you eat meat, add one meatless meal a week. Meat costs a lot at the store-and it's even more expensive when you consider the related environmental and health costs.",
            "Buy locally raised, humane, and organic meat, eggs, and dairy whenever you can. Purchasing from local farmers keeps money in the local economy.",
            "Compost the leftovers. Composting leftovers will ease the burden on the landfill, give you great soil, and keep your kitchen waste basket from smelling. Apartment dwellers and yardless wonders can do it too!",
            "Grow your own food. In the garden, in the greenhouse, in the window box, or something fancier. Even urbanites can get quite a bit of good eats from not much space.",
            "Just enough. Put some extra planning into the amount of food you cook will cut back on waste. If" +
                " it's something that will spoil quickly, try to avoid making more than you or your family can eat. If you've got extra, make a friend happy with a home cooked surprise. ",
        ]
    },
    {
        a : 'water',
        q : [
            "Take shorter showers to reduce water use. This will lower your water and heating bills too.",
            "Install a low-flow showerhead. They don't cost much, and the water and energy savings can quickly pay back your investment.",
            "I always check my faucet/toilet/shower for dripping (keeping your existing equipment well maintained is probably the easiest and cheapest way to start saving water).",
            "I turn off the water while brushing your teeth or shaving.",
            "When washing dishes by hand, fill up the sink and turn off the water."
        ]
    },
    {
        a : 'recycle',
        q : [
            "Use a water filter to purify tap water instead of buying bottled water. Not only is bottled water expensive, but it generates large amounts of container waste",
            "Bring a reusable water bottle, preferably aluminum rather than plastic, with you when traveling or at work.",
            "Keep your cell phones, computers, and other electronics as long as possible.",
            "Donate or recycle them responsibly when the time comes. E-waste contains mercury and other toxics and is a growing environmental problem.",


        ]
    },
    {
        a : 'commerce',
        q : [
            "Borrow from libraries instead of buying personal books and movies. This saves money, not to mention the ink and paper that goes into printing new books",
            "Share power tools and other appliances. Get to know your neighbors while cutting down on the number of things cluttering your closet or garage.",
            "Buy in bulk. Purchasing food from bulk bins can save money and packaging.",
            "Wear clothes that don't need to be dry-cleaned. This saves money and cuts down on toxic chemical use.",
            "Invest in high-quality, long-lasting products. You might pay more now, but you'll be happy when you don't have to replace items as frequently (and this means less waste!).",
            "Make your own cleaning supplies.: you can make very effective, non-toxic cleaning products whenever you need them. All you need are a few simple ingredients like baking soda, vinegar, lemon, and soap.",
            "Go online to find new or gently used secondhand products. Whether you've just moved or are looking to redecorate, consider a service like craigslist or FreeSharing to track down furniture, appliances, and other items cheaply or for free.",
        ]
    }
];