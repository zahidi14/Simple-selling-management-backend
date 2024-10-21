
ALTER DATABASE ivm OWNER TO postgres;


CREATE TABLE orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    qty integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'pending'::character varying
);


ALTER TABLE orders OWNER TO postgres;



CREATE TABLE product (
    id integer NOT NULL,
    name character varying(100),
    description text,
    price numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    threshold integer
);


ALTER TABLE product OWNER TO postgres;



CREATE TABLE users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE users OWNER TO postgres;



--
-- TOC entry 3369 (class 0 OID 24610)
-- Dependencies: 219
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO orders VALUES (1, 2, 1, 2, 500.00, '2024-10-02 10:57:49.180785', 'pending');


--
-- TOC entry 3365 (class 0 OID 16410)
-- Dependencies: 215
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO product VALUES (1, 'sampan', 'besampan', 5000000.00, 5, '2024-09-25', 1);


--
-- TOC entry 3367 (class 0 OID 16420)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO users VALUES (2, 'zero', '$2b$04$Ev8/i2iuIGZ9tGYmV7Mqx..0HYmRvG.BxCaSg7OkBGiejEp1b63M.');

