import React, { useState, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  TrashIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Tech Corp',
      budget: '$5,000 - $10,000',
      message: 'We are interested in developing a custom e-commerce platform for our business. Would love to discuss the possibilities.',
      date: '2024-01-15T10:30:00Z',
      status: 'unread',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      company: 'Startup Inc',
      budget: '$1,000 - $5,000',
      message: 'Looking for a mobile app developer to help us launch our new product. Timeline is tight, need someone reliable.',
      date: '2024-01-14T15:45:00Z',
      status: 'read',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@business.com',
      company: 'Business Solutions',
      budget: '$10,000+',
      message: 'We need a complete digital transformation for our company. Looking for an experienced team to handle everything.',
      date: '2024-01-13T09:20:00Z',
      status: 'read',
      priority: 'low'
    }
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return message.status === 'unread';
    if (filter === 'read') return message.status === 'read';
    return true;
  });

  const markAsRead = (id) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'read' } : msg
    ));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const archiveMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
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
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage contact form submissions</p>
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
          <button className="flex-1 sm:flex-none px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 font-bold text-sm">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Messages</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredMessages.filter(m => m.status === 'unread').length} unread
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setSelectedMessage(message);
                    markAsRead(message.id);
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedMessage?.id === message.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                      : ''
                  } ${message.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {message.name}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                        {message.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {formatDate(message.date)}
                      </p>
                    </div>
                    {message.status === 'unread' && (
                      <div className="flex-shrink-0">
                        <div className="h-2.5 w-2.5 bg-primary-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedMessage.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMessage.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => archiveMessage(selectedMessage.id)}
                      className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <ArchiveBoxIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <UserIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMessage.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <EnvelopeIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMessage.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Company</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMessage.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMessage.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Message</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-card">
                    Reply
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 p-12 flex items-center justify-center">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a message</h3>
                <p className="text-gray-500 dark:text-gray-400">Choose a message from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;