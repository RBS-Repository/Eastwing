import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Icon, useToast } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './Map.css';

const Map = () => {
    const [mapUrl, setMapUrl] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Eastwing Dolores');
    const toast = useToast();

    const branches = [
        {
            name: "Eastwing Dolores",
            address: "Dolores, Eastern Samar",
            phone: "09632371247",
            hours: "8:00 AM - 10:00 PM",
            email: "eastwingdolores@gmail.com",
            coordinates: "14.762323163139056, 121.15060691402303"
        },
        {
            name: "Eastwing Borongan",
            address: "Real St., Borongan City, Eastern Samar",
            phone: "09123456789",
            hours: "8:00 AM - 11:00 PM",
            email: "eastwingborongan@gmail.com",
            coordinates: "14.539062306565006, 121.005063477535"
        },
        {
            name: "Eastwing Guiuan",
            address: "National Highway, Guiuan, Eastern Samar",
            phone: "09987654321",
            hours: "8:00 AM - 10:00 PM",
            email: "eastwingguiuan@gmail.com",
            coordinates: "14.632387650560645, 120.96369775195113"
        },
        {
            name: "Eastwing Oras",
            address: "Oras, Eastern Samar",
            phone: "09456789123",
            hours: "8:00 AM - 9:00 PM",
            email: "eastwingoras@gmail.com",
            coordinates: "14.643166762666254, 121.0562663444822"
        }
    ];

    useEffect(() => {
        // Set initial map
        const defaultBranch = branches.find(b => b.name === selectedLocation);
        if (defaultBranch) {
            setMapUrl(`https://maps.google.com/maps?q=${defaultBranch.coordinates}&output=embed`);
        }
    }, []);

    const handleLocationClick = (branch) => {
        setSelectedLocation(branch.name);
        setMapUrl(`https://maps.google.com/maps?q=${branch.coordinates}&output=embed`);
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Copied!",
                description: `${type} copied to clipboard`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <Box id="location" className="map-section">
            <Container maxW="1200px" py={10}>
                <Box 
                    display="grid" 
                    gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                    gap={8}
                    alignItems="start"
                >
                    <VStack align="start" spacing={6} className="location-info">
                        <Heading className="location-heading">
                            Our Branches
                        </Heading>

                        <VStack align="start" spacing={6} width="100%" className="branches-list">
                            {branches.map((branch, index) => (
                                <Box 
                                    key={index}
                                    className={`branch-item ${selectedLocation === branch.name ? 'active' : ''}`}
                                    onClick={() => handleLocationClick(branch)}
                                >
                                    <div className="branch-content">
                                        <Heading className="branch-name">
                                            {branch.name}
                                        </Heading>
                                        
                                        <div className="location-rows-container">
                                            <HStack spacing={3} className="location-row">
                                                <Icon as={FaMapMarkerAlt} className="location-icon" />
                                                <Text className="location-text">
                                                    {branch.address}
                                                </Text>
                                            </HStack>

                                            <HStack spacing={3} className="location-row copyable"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    copyToClipboard(branch.phone, 'Phone number');
                                                }}
                                            >
                                                <Icon as={FaPhone} className="location-icon" />
                                                <Text className="location-text">
                                                    {branch.phone}
                                                </Text>
                                            </HStack>

                                            <HStack spacing={3} className="location-row">
                                                <Icon as={FaClock} className="location-icon" />
                                                <Text className="location-text">
                                                    {branch.hours}
                                                </Text>
                                            </HStack>

                                            <HStack spacing={3} className="location-row copyable"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    copyToClipboard(branch.email, 'Email');
                                                }}
                                            >
                                                <Icon as={FaEnvelope} className="location-icon" />
                                                <Text className="location-text">
                                                    {branch.email}
                                                </Text>
                                            </HStack>
                                        </div>
                                    </div>
                                </Box>
                            ))}
                        </VStack>
                    </VStack>

                    <Box className="map-container">
                        <iframe
                            title="Branch Location"
                            className="map-frame"
                            src={mapUrl}
                            allowFullScreen
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Map;
