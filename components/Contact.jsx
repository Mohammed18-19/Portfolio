import React, { useRef, useState } from "react";
import './Contact.css';
import { MdContactMail, MdEmail, MdMessage, MdPhone } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import PhoneInputLib from 'react-phone-input-2';
const PhoneInput = PhoneInputLib.default ?? PhoneInputLib;
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebGLGuard from "./WebGLGuard";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: form.phone,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      toast.success("Message sent! Thank you for getting in touch.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact. <MdContactMail className="inline-block" /></h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 flex items-center gap-2'><FaUser /> Enter your name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 flex items-center gap-2'><MdEmail /> Enter your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 flex items-center gap-2'><MdPhone /> Enter your phone number</span>
            <PhoneInput
              country={'in'}
              value={form.phone}
              onChange={phone => setForm({ ...form, phone })}
              inputStyle={{
                width: '100%',
                height: '58px',
                backgroundColor: '#151030',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                paddingLeft: '48px',
                fontSize: '16px',
                fontWeight: '500'
              }}
              buttonStyle={{
                backgroundColor: '#151030',
                border: 'none',
                borderRadius: '0.5rem 0 0 0.5rem',
                paddingLeft: '5px'
              }}
              dropdownStyle={{
                backgroundColor: '#151030',
                color: 'white',
                border: '1px solid #aaa6c3'
              }}
              containerStyle={{
                width: '100%',
              }}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 flex items-center gap-2'><MdMessage /> Write your message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <WebGLGuard>

          <EarthCanvas />

        </WebGLGuard>
      </motion.div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
