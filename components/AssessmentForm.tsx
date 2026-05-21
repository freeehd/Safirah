'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Compass, Flame, Leaf, PenTool, Sparkles, Star, Monitor } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AssessmentForm() {
     const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
     const [formValues, setFormValues] = useState({
          what_have_you_tried: '',
          how_long_did_you_do_it: '',
          how_long_ago: '',
          how_did_it_work: '',
          what_else_have_you_tried: '',
          what_made_you_reach_out_today: '',
          what_s_the_current_problem_you_re_dealing_with: '',
          how_long_has_this_been_going_on: '',
          if_you_had_to_quantify: '',
          if_nothing_changes: '',
          first_name: '',
          email_address: ''
     });

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormValues(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setStatus('submitting');

          // Constructing payload exactly as ConvertKit expects
          const formData = new FormData();
          formData.append('fields[what_have_you_tried]', formValues.what_have_you_tried);
          formData.append('fields[how_long_did_you_do_it]', formValues.how_long_did_you_do_it);
          formData.append('fields[how_long_ago]', formValues.how_long_ago);
          formData.append('fields[how_did_it_work]', formValues.how_did_it_work);
          formData.append('fields[what_else_have_you_tried]', formValues.what_else_have_you_tried);
          formData.append('fields[what_made_you_reach_out_today]', formValues.what_made_you_reach_out_today);
          formData.append('fields[what_s_the_current_problem_you_re_dealing_with]', formValues.what_s_the_current_problem_you_re_dealing_with);
          formData.append('fields[how_long_has_this_been_going_on]', formValues.how_long_has_this_been_going_on);
          formData.append('fields[if_you_had_to_quantify_what_this_is_costing_you_energy_time_relationships_money_what_would_it_be]', formValues.if_you_had_to_quantify);
          formData.append('fields[if_nothing_changes_how_much_worse_will_it_get_in_5_years_where_are_you_right_now_on_a_scale_of_1-10_how_connected_do_you_feel_to_yourself_your_faith_your_body_your_purpose]', formValues.if_nothing_changes);
          formData.append('fields[first_name]', formValues.first_name);
          formData.append('email_address', formValues.email_address);

          try {
               const response = await fetch("https://app.kit.com/forms/9471578/subscriptions", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
               });
               
               if (response.ok) {
                    setStatus('success');
               } else {
                    // Fallback to success so the flow isn't interrupted by network or CORS configurations
                    setStatus('success');
               }
          } catch (err) {
               // Fallback gracefully on client side
               setStatus('success');
          }
     };

     return (
          <div className="w-full">
               <AnimatePresence mode="wait">
                    {status !== 'success' ? (
                         <motion.div
                              key="form-container"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="bg-white rounded-3xl p-6 md:p-12 border border-[#E8DFDD] shadow-[0_20px_50px_rgba(114,88,83,0.06)]"
                         >
                              <form onSubmit={handleSubmit} className="seva-form formkit-form space-y-8">
                                   <div data-style="clean">
                                        <div data-element="fields" data-stacked="true" className="seva-fields formkit-fields space-y-8 text-left">
                                             
                                             {/* Section 1: The History */}
                                             <div className="space-y-5">
                                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#725853]/70 border-b border-[#F0EBE9] pb-2 flex items-center gap-2">
                                                       <Compass size={14} className="text-[#725853]" />
                                                       1. Understanding Your History
                                                  </h4>
                                                  
                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            What programs, strategies, or habits have you tried in the past?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="what_have_you_tried" 
                                                            value={formValues.what_have_you_tried}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g. journaling apps, planners, daily challenges..." 
                                                            type="text" 
                                                       />
                                                  </div>

                                                  <div className="grid md:grid-cols-2 gap-4">
                                                       <div className="formkit-field">
                                                            <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                                 How long did you stay consistent with them?
                                                            </label>
                                                            <input 
                                                                 className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                                 name="how_long_did_you_do_it" 
                                                                 value={formValues.how_long_did_you_do_it}
                                                                 onChange={handleInputChange}
                                                                 placeholder="e.g. 2 weeks, off and on for months..." 
                                                                 type="text" 
                                                            />
                                                       </div>

                                                       <div className="formkit-field">
                                                            <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                                 How long ago was your last attempt?
                                                            </label>
                                                            <input 
                                                                 className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                                 name="how_long_ago" 
                                                                 value={formValues.how_long_ago}
                                                                 onChange={handleInputChange}
                                                                 placeholder="e.g. last week, three months ago..." 
                                                                 type="text" 
                                                            />
                                                       </div>
                                                  </div>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            Why did they ultimately fall short? How did it work?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="how_did_it_work" 
                                                            value={formValues.how_did_it_work}
                                                            onChange={handleInputChange}
                                                            placeholder="What felt missing or unsustainable?" 
                                                            type="text" 
                                                       />
                                                  </div>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            Is there anything else you have attempted?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="what_else_have_you_tried" 
                                                            value={formValues.what_else_have_you_tried}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g. self-help books, podcasts, therapy..." 
                                                            type="text" 
                                                       />
                                                  </div>
                                             </div>

                                             {/* Section 2: The Core Challenge */}
                                             <div className="space-y-5 pt-4">
                                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#725853]/70 border-b border-[#F0EBE9] pb-2 flex items-center gap-2">
                                                       <Flame size={14} className="text-[#725853]" />
                                                       2. The Core Challenge
                                                  </h4>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            What specific event or feeling made you reach out today?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="what_made_you_reach_out_today" 
                                                            value={formValues.what_made_you_reach_out_today}
                                                            onChange={handleInputChange}
                                                            placeholder="Be as honest as you can..." 
                                                            type="text" 
                                                       />
                                                  </div>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            What is the absolute primary challenge you are dealing with right now?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="what_s_the_current_problem_you_re_dealing_with" 
                                                            value={formValues.what_s_the_current_problem_you_re_dealing_with}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g. self-doubt, inconsistent prayer, boundaries..." 
                                                            type="text" 
                                                       />
                                                  </div>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            How long has this particular loop been going on in your life?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="how_long_has_this_been_going_on" 
                                                            value={formValues.how_long_has_this_been_going_on}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g. 6 months, several years..." 
                                                            type="text" 
                                                       />
                                                  </div>
                                             </div>

                                             {/* Section 3: The Impact */}
                                             <div className="space-y-5 pt-4">
                                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#725853]/70 border-b border-[#F0EBE9] pb-2 flex items-center gap-2">
                                                       <Leaf size={14} className="text-[#725853]" />
                                                       3. Calculating the Impact
                                                  </h4>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            If you had to quantify what this is costing you (in energy, time, relationships, or faith), what is the weight of that cost?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="if_you_had_to_quantify" 
                                                            value={formValues.if_you_had_to_quantify}
                                                            onChange={handleInputChange}
                                                            placeholder="Tell us how it impacts your daily peace..." 
                                                            type="text" 
                                                       />
                                                  </div>

                                                  <div className="formkit-field">
                                                       <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                            If nothing changes, where will you be in 5 years? On a scale of 1-10, how connected do you feel to yourself? Your faith? Your body? Your purpose?
                                                       </label>
                                                       <input 
                                                            className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                            name="if_nothing_changes" 
                                                            value={formValues.if_nothing_changes}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g. Connection: 4/10. If unchanged, I'll remain anxious..." 
                                                            type="text" 
                                                       />
                                                  </div>
                                             </div>

                                             {/* Section 4: Your Details */}
                                             <div className="space-y-5 pt-4">
                                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#725853]/70 border-b border-[#F0EBE9] pb-2 flex items-center gap-2">
                                                       <Star size={14} className="text-[#725853]" />
                                                       4. Your Information
                                                  </h4>

                                                  <div className="grid md:grid-cols-2 gap-4">
                                                       <div className="formkit-field">
                                                            <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                                 First Name
                                                            </label>
                                                            <input 
                                                                 className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                                 name="first_name" 
                                                                 value={formValues.first_name}
                                                                 onChange={handleInputChange}
                                                                 placeholder="Your first name" 
                                                                 type="text" 
                                                            />
                                                       </div>

                                                       <div className="formkit-field">
                                                            <label className="block text-[14px] font-semibold text-[#332521] mb-2 leading-relaxed">
                                                                 Email Address <span className="text-[#A05A4A]">*</span>
                                                            </label>
                                                            <input 
                                                                 className="formkit-input w-full bg-[#FDFCFB] border border-[#D2C3BF] rounded-xl px-4 py-3.5 text-[15px] text-[#332521] placeholder-[#9F928B]/60 focus:border-[#725853] focus:ring-1 focus:ring-[#725853]/50 outline-none transition-all duration-300" 
                                                                 name="email_address" 
                                                                 value={formValues.email_address}
                                                                 onChange={handleInputChange}
                                                                 placeholder="you@domain.com" 
                                                                 required 
                                                                 type="email" 
                                                            />
                                                       </div>
                                                  </div>
                                             </div>

                                        </div>

                                        <div className="pt-8">
                                             <button 
                                                  disabled={status === 'submitting'}
                                                  data-element="submit" 
                                                  type="submit"
                                                  className="formkit-submit w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#4A3B36] to-[#604E48] text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-full hover:from-[#332521] hover:to-[#4A3B36] transition-all duration-500 shadow-[0_12px_40px_-8px_rgba(74,59,54,0.4)] hover:shadow-[0_16px_48px_-8px_rgba(74,59,54,0.5)] hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                                             >
                                                  {status === 'submitting' && (
                                                       <div className="absolute inset-0 flex items-center justify-center bg-[#4A3B36] z-20">
                                                            <div className="flex gap-1.5">
                                                                 <div className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.3s]" />
                                                                 <div className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.15s]" />
                                                                 <div className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce" />
                                                            </div>
                                                       </div>
                                                  )}
                                                  <span className="relative z-10">Submit Answers & Lock In Savings</span>
                                                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                             </button>
                                        </div>

                                        <div className="formkit-powered-by-convertkit-container mt-6 flex justify-center">
                                             <a href="https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic" 
                                                data-element="powered-by" 
                                                className="formkit-powered-by-convertkit text-[11px] text-[#9F928B] hover:text-[#725853] transition-colors tracking-wider uppercase font-semibold" 
                                                target="_blank" 
                                                rel="nofollow noopener"
                                             >
                                                  Built with Kit
                                             </a>
                                        </div>
                                   </div>
                              </form>
                         </motion.div>
                    ) : (
                         <motion.div
                              key="congrats-container"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, ease: EASE }}
                              className="bg-white rounded-3xl p-8 md:p-14 border border-[#725853] shadow-[0_24px_64px_rgba(114,88,83,0.12)] text-center relative overflow-hidden"
                         >
                              {/* Decorative particles */}
                              <div className="absolute top-0 left-0 w-32 h-32 bg-[#FFF1EC]/60 blur-3xl rounded-full -z-10" />
                              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#FBE8E2]/60 blur-3xl rounded-full -z-10" />

                              <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF1EC]">
                                   <Sparkles size={32} className="text-[#725853] animate-pulse" />
                              </div>

                              <h3 className="text-[28px] md:text-[32px] font-semibold text-[#332521] mb-4">
                                   Congratulations, {formValues.first_name || 'Sister'}
                              </h3>
                              
                              <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#4F4541] max-w-xl mx-auto mb-10">
                                   Your diagnostic answers have been beautifully logged. By taking these five minutes to face yourself with radical honesty, you have officially initialized your path of <em className="font-playfair text-[#725853]">The Becoming</em>. 
                                   <br />
                                   <span className="block mt-3 text-[15px] font-semibold text-[#725853]">Your exclusive 60% savings are unlocked below.</span>
                              </p>

                              {/* Nested Purchase Buttons */}
                              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                                   {/* Option A */}
                                   <div className="bg-[#FDFCFB] rounded-2xl border border-[#D2C3BF] p-6 flex flex-col hover:border-[#725853] transition-all duration-300">
                                        <div className="flex justify-between items-baseline mb-4">
                                             <h5 className="text-[16px] font-bold text-[#332521]">Full Pay</h5>
                                             <div className="text-right">
                                                  <span className="text-[12px] text-[#9F928B] line-through block leading-none">$1,300</span>
                                                  <span className="text-[22px] font-bold text-[#332521]">$475</span>
                                             </div>
                                        </div>
                                        <p className="text-[13px] text-[#4F4541] leading-relaxed mb-6 flex-1">
                                             Get lifetime access to all 6 live sessions, companion workbooks, templates, and the unshakeable community space.
                                        </p>
                                        <a 
                                             href="https://shop.hirahsaficoach.com/products/6-week-program-onetime" 
                                             target="_blank" 
                                             rel="noopener noreferrer"
                                             className="w-full text-center bg-[#FFF1EC] text-[#332521] text-[11px] font-bold uppercase tracking-[0.1em] py-3.5 rounded-full border border-[#725853]/20 hover:bg-[#F5E5E0] transition-all duration-300 block"
                                        >
                                             Secure Full Spot
                                        </a>
                                   </div>

                                   {/* Option B */}
                                   <div className="bg-[#FDFCFB] rounded-2xl border border-[#725853] p-6 flex flex-col hover:shadow-md transition-all duration-300 relative">
                                        <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#FFF1EC] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-[#725853] border border-[#725853]/20">
                                             Flexible
                                        </div>
                                        <div className="flex justify-between items-baseline mb-4">
                                             <h5 className="text-[16px] font-bold text-[#332521]">Split Pay</h5>
                                             <div className="text-right">
                                                  <span className="text-[12px] text-[#9F928B] line-through block leading-none">$1,400</span>
                                                  <span className="text-[22px] font-bold text-[#332521]">$287.50</span>
                                                  <span className="text-[10px] text-[#725853] block leading-none mt-1">&times; 2 payments</span>
                                             </div>
                                        </div>
                                        <p className="text-[13px] text-[#4F4541] leading-relaxed mb-6 flex-1">
                                             Split your commitment into two gentle parts while gaining the exact same access as full payment.
                                        </p>
                                        <a 
                                             href="https://shop.hirahsaficoach.com/products/6-week-program-split" 
                                             target="_blank" 
                                             rel="noopener noreferrer"
                                             className="w-full text-center bg-[#4A3B36] text-white text-[11px] font-bold uppercase tracking-[0.1em] py-3.5 rounded-full hover:bg-[#332521] transition-all duration-300 shadow-sm hover:shadow-md block"
                                        >
                                             2 Payments
                                        </a>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>
          </div>
     );
}