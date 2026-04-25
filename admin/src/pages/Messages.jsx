import React, { useState, useEffect } from 'react';
import { api } from '../api';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  TrashIcon,
  ArchiveBoxIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await api.getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return message.status === 'unread';
    if (filter === 'read') return message.status === 'read';
    return true;
  });

  const markAsRead = async (id) => {
    try {
      const updated = await api.updateMessage(id, { status: 'read' });
      setMessages(messages.map(msg =>
        msg._id === id ? updated.data : msg
      ));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(updated.data);
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(messages.filter(msg => msg._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all">
        <div className="max-w-full overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">Messages</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Direct inquiries from your portfolio visitors</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm font-bold"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <button 
            onClick={fetchMessages}
            className="flex-1 sm:flex-none p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-all"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading && messages.length === 0 ? (
        <div className="flex justify-center p-12">
          <ArrowPathIcon className="h-8 w-8 text-emerald-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Inquiries</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {messages.filter(m => m.status === 'unread').length} unread messages
                </p>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-250px)] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No messages found</div>
                ) : (
                  filteredMessages.map((message, index) => (
                    <motion.div
                      key={message._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (message.status === 'unread') markAsRead(message._id);
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedMessage?._id === message._id
                          ? 'bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500'
                          : ''
                      } ${message.status === 'unread' ? 'font-bold' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-900 dark:text-white truncate">
                            {message.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                            {message.message}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">
                            {formatDate(message.createdAt)}
                          </p>
                        </div>
                        {message.status === 'unread' && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[400px]"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedMessage.name}
                        </h2>
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">{selectedMessage.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => deleteMessage(selectedMessage._id)}
                          className="p-2.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <UserIcon className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Contact Name</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedMessage.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <EnvelopeIcon className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email Address</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedMessage.email}</p>
                        </div>
                      </div>

                      {selectedMessage.company && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <BuildingOfficeIcon className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Company / Org</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedMessage.company}</p>
                          </div>
                        </div>
                      )}

                      {selectedMessage.budget && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <CurrencyDollarIcon className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Project Budget</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedMessage.budget}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Message Content</h3>
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        <EnvelopeIcon className="h-5 w-5" />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 p-12 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select an inquiry</h3>
                    <p className="text-gray-500 dark:text-gray-400">Choose a message from the list to view full details and reply</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;